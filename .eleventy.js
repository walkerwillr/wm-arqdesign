const path = require("path");
const Image = require("@11ty/eleventy-img");

/**
 * Shortcode de imagem responsiva (WebP + JPEG, múltiplos tamanhos).
 * O eleventy-img strippa metadados (EXIF/GPS) por padrão — dupla garantia
 * de privacidade além do -strip aplicado na conversão dos originais.
 */
async function imageShortcode(
  input,
  alt,
  sizes = "100vw",
  className = "",
  loading = "lazy",
  fetchpriority = "auto"
) {
  if (!input) return "";
  const metadata = await Image(input, {
    widths: [400, 800, 1200, 1600],
    formats: ["webp", "jpeg"],
    outputDir: path.join(".", "_site", "img"),
    urlPath: "/img/",
    sharpJpegOptions: { quality: 78, progressive: true, mozjpeg: true },
    sharpWebpOptions: { quality: 76 },
    filenameFormat: (id, src, width, format) => {
      const name = path.basename(src, path.extname(src));
      const dir = path.basename(path.dirname(src));
      return `${dir}-${name}-${width}.${format}`;
    },
  });

  const attrs = {
    alt: alt || "",
    sizes,
    loading,
    decoding: "async",
  };
  if (className) attrs.class = className;
  if (fetchpriority && fetchpriority !== "auto") attrs.fetchpriority = fetchpriority;

  return Image.generateHTML(metadata, attrs);
}

module.exports = function (eleventyConfig) {
  // ---- Passthrough (assets estáticos) ------------------------------------
  eleventyConfig.addPassthroughCopy({ "src/assets/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" }); // favicon.ico, etc.

  // ---- Watch -------------------------------------------------------------
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  // ---- Shortcodes de imagem ---------------------------------------------
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  // ---- Filtros -----------------------------------------------------------
  eleventyConfig.addFilter("getCategories", (projects) => {
    const seen = [];
    for (const p of projects) {
      if (p.category && !seen.includes(p.category)) seen.push(p.category);
    }
    return seen;
  });

  eleventyConfig.addFilter("where", (arr, key, value) =>
    (arr || []).filter((item) => item[key] === value)
  );

  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  eleventyConfig.addFilter("absUrl", (url, base) => {
    try {
      return new URL(url, base).href;
    } catch (e) {
      return url;
    }
  });

  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString());

  eleventyConfig.addFilter("slugify", (str) =>
    String(str)
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );

  // ---- Coleção explícita de projetos (para paginação) --------------------
  eleventyConfig.addCollection("projetos", (collectionApi) => {
    // usa o data global `projects` via require para manter ordem
    const projects = require("./src/_data/projects.js")();
    return projects;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: "/",
  };
};
