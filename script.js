$(document).ready(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return $(el);
    } else {
      return $(el).eq(0);
    }
  };

  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).each(function () {
        $(this).on(type, listener);
      });
    } else {
      select(el, all).on(type, listener);
    }
  };

  const onscroll = (el, listener) => {
    $(el).scroll(listener);
  };

  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.outerHeight();

    if (!header.hasClass("header-scrolled")) {
      offset -= 50;
    }

    let elementPos = select(el).offset().top;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  let backtotop = select(".back-to-top");
  if (backtotop.length) {
    const toggleBacktotop = () => {
      if ($(window).scrollTop() > 100) {
        backtotop.addClass("active");
      } else {
        backtotop.removeClass("active");
      }
    };
    $(window).on("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  on(
    "click",
    ".scrollto",
    function (e) {
      if (select($(this).attr("href")).length) {
        e.preventDefault();
        scrollto($(this).attr("href"));
      }
    },
    true
  );

  $("body").animate(
    {
      top: 0,
    },
    1000,
    "linear"
  );
});
