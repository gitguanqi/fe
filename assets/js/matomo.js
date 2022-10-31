/*
 * @Autor: MarkGuan
 * @Date: 2021-12-22 17:53:53
 * @LastEditors: MarkGuan
 * @LastEditTime: 2022-10-31 10:55:49
 * @Description: This a website tracker code.
 */
(function () {  
  var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//am.guanqi.xyz/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '3']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
})();