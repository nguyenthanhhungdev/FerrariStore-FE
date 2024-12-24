// using hook implementation of (https://github.com/saltycrane/use-fit-text/tree/39d540ad7eafde9ce8cb4335a023664c5023416b)
// borrowing some element processing logic of STRML/textFit (https://github.com/STRML/textFit/blob/7a1eed6db54a97798556eed3c57b2ce1f87dbab4/textFit.js)
// with some adjustments:
// - dumb down to only project requirement
// - can accept a list of fixed sont sizes to choose
// - rewritten to utilise both settimeout + requestanimationframe
// - can get dimensions to fit to from a function (in case of fitting remaining space in a flexbox, can obtain available height)
// - clone to another element to calculate to avoid layout thrashing
// - in pixel instead of percentage
// - resize observer is used on parent element
// dependencies:
// - use-resize-observer
// - react-timing-hooks
// - jquery

// original implementation saltycrane/use-fit-text v2.4.0
// import {
//   useCallback,
//   useEffect,
//   useLayoutEffect,
//   useRef,
//   useState,
// } from "react";
// import ResizeObserver from "resize-observer-polyfill";

// export type TLogLevel = "debug" | "info" | "warn" | "error" | "none";

// export type TOptions = {
//   logLevel?: TLogLevel;
//   maxFontSize?: number;
//   minFontSize?: number;
//   onFinish?: (fontSize: number) => void;
//   onStart?: () => void;
//   resolution?: number;
// };

// const LOG_LEVEL: Record<TLogLevel, number> = {
//   debug: 10,
//   info: 20,
//   warn: 30,
//   error: 40,
//   none: 100,
// };

// // Suppress `useLayoutEffect` warning when rendering on the server
// // https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
// const useIsoLayoutEffect =
//   typeof window !== "undefined" &&
//   window.document &&
//   window.document.createElement
//     ? useLayoutEffect
//     : useEffect;

// const useFitText = ({
//   logLevel: logLevelOption = "info",
//   maxFontSize = 100,
//   minFontSize = 20,
//   onFinish,
//   onStart,
//   resolution = 5,
// }: TOptions = {}) => {
//   const logLevel = LOG_LEVEL[logLevelOption];

//   const initState = useCallback(() => {
//     return {
//       calcKey: 0,
//       fontSize: maxFontSize,
//       fontSizePrev: minFontSize,
//       fontSizeMax: maxFontSize,
//       fontSizeMin: minFontSize,
//     };
//   }, [maxFontSize, minFontSize]);

//   const ref = useRef<HTMLDivElement>(null);
//   const innerHtmlPrevRef = useRef<string>();
//   const isCalculatingRef = useRef(false);
//   const [state, setState] = useState(initState);
//   const { calcKey, fontSize, fontSizeMax, fontSizeMin, fontSizePrev } = state;

//   // Montior div size changes and recalculate on resize
//   let animationFrameId: number | null = null;
//   const [ro] = useState(
//     () =>
//       new ResizeObserver(() => {
//         animationFrameId = window.requestAnimationFrame(() => {
//           if (isCalculatingRef.current) {
//             return;
//           }
//           onStart && onStart();
//           isCalculatingRef.current = true;
//           // `calcKey` is used in the dependencies array of
//           // `useIsoLayoutEffect` below. It is incremented so that the font size
//           // will be recalculated even if the previous state didn't change (e.g.
//           // when the text fit initially).
//           setState({
//             ...initState(),
//             calcKey: calcKey + 1,
//           });
//         });
//       }),
//   );

//   useEffect(() => {
//     if (ref.current) {
//       ro.observe(ref.current);
//     }
//     return () => {
//       animationFrameId && window.cancelAnimationFrame(animationFrameId);
//       ro.disconnect();
//     };
//   }, [animationFrameId, ro]);

//   // Recalculate when the div contents change
//   const innerHtml = ref.current && ref.current.innerHTML;
//   useEffect(() => {
//     if (calcKey === 0 || isCalculatingRef.current) {
//       return;
//     }
//     if (innerHtml !== innerHtmlPrevRef.current) {
//       onStart && onStart();
//       setState({
//         ...initState(),
//         calcKey: calcKey + 1,
//       });
//     }
//     innerHtmlPrevRef.current = innerHtml;
//   }, [calcKey, initState, innerHtml, onStart]);

//   // Check overflow and resize font
//   useIsoLayoutEffect(() => {
//     // Don't start calculating font size until the `resizeKey` is incremented
//     // above in the `ResizeObserver` callback. This avoids an extra resize
//     // on initialization.
//     if (calcKey === 0) {
//       return;
//     }

//     const isWithinResolution = Math.abs(fontSize - fontSizePrev) <= resolution;
//     const isOverflow =
//       !!ref.current &&
//       (ref.current.scrollHeight > ref.current.offsetHeight ||
//         ref.current.scrollWidth > ref.current.offsetWidth);
//     const isFailed = isOverflow && fontSize === fontSizePrev;
//     const isAsc = fontSize > fontSizePrev;

//     // Return if the font size has been adjusted "enough" (change within `resolution`)
//     // reduce font size by one increment if it's overflowing.
//     if (isWithinResolution) {
//       if (isFailed) {
//         isCalculatingRef.current = false;
//         if (logLevel <= LOG_LEVEL.info) {
//           console.info(
//             `[use-fit-text] reached \`minFontSize = ${minFontSize}\` without fitting text`,
//           );
//         }
//       } else if (isOverflow) {
//         setState({
//           fontSize: isAsc ? fontSizePrev : fontSizeMin,
//           fontSizeMax,
//           fontSizeMin,
//           fontSizePrev,
//           calcKey,
//         });
//       } else {
//         isCalculatingRef.current = false;
//         onFinish && onFinish(fontSize);
//       }
//       return;
//     }

//     // Binary search to adjust font size
//     let delta: number;
//     let newMax = fontSizeMax;
//     let newMin = fontSizeMin;
//     if (isOverflow) {
//       delta = isAsc ? fontSizePrev - fontSize : fontSizeMin - fontSize;
//       newMax = Math.min(fontSizeMax, fontSize);
//     } else {
//       delta = isAsc ? fontSizeMax - fontSize : fontSizePrev - fontSize;
//       newMin = Math.max(fontSizeMin, fontSize);
//     }
//     setState({
//       calcKey,
//       fontSize: fontSize + delta / 2,
//       fontSizeMax: newMax,
//       fontSizeMin: newMin,
//       fontSizePrev: fontSize,
//     });
//   }, [
//     calcKey,
//     fontSize,
//     fontSizeMax,
//     fontSizeMin,
//     fontSizePrev,
//     onFinish,
//     ref,
//     resolution,
//   ]);

//   return { fontSize: `${fontSize}%`, ref };
// };

// export default useFitText;

// original implementation STRML/textFit v2.3.1
// /**
//  * textFit v2.3.1
//  * Previously known as jQuery.textFit
//  * 11/2014 by STRML (strml.github.com)
//  * MIT License
//  *
//  * To use: textFit(document.getElementById('target-div'), options);
//  *
//  * Will make the *text* content inside a container scale to fit the container
//  * The container is required to have a set width and height
//  * Uses binary search to fit text with minimal layout calls.
//  * Version 2.0 does not use jQuery.
//  */
// /*global define:true, document:true, window:true, HTMLElement:true*/

// (function(root, factory) {
//   "use strict";

//   // UMD shim
//   if (typeof define === "function" && define.amd) {
//     // AMD
//     define([], factory);
//   } else if (typeof exports === "object") {
//     // Node/CommonJS
//     module.exports = factory();
//   } else {
//     // Browser
//     root.textFit = factory();
//   }

// }(typeof global === "object" ? global : this, function () {
//   "use strict";

//   var defaultSettings = {
//     alignVert: false, // if true, textFit will align vertically using css tables
//     alignHoriz: false, // if true, textFit will set text-align: center
//     multiLine: false, // if true, textFit will not set white-space: no-wrap
//     detectMultiLine: true, // disable to turn off automatic multi-line sensing
//     minFontSize: 6,
//     maxFontSize: 80,
//     reProcess: true, // if true, textFit will re-process already-fit nodes. Set to 'false' for better performance
//     widthOnly: false, // if true, textFit will fit text to element width, regardless of text height
//     alignVertWithFlexbox: false, // if true, textFit will use flexbox for vertical alignment
//   };

//   return function textFit(els, options) {

//     if (!options) options = {};

//     // Extend options.
//     var settings = {};
//     for(var key in defaultSettings){
//       if(options.hasOwnProperty(key)){
//         settings[key] = options[key];
//       } else {
//         settings[key] = defaultSettings[key];
//       }
//     }

//     // Convert jQuery objects into arrays
//     if (typeof els.toArray === "function") {
//       els = els.toArray();
//     }

//     // Support passing a single el
//     var elType = Object.prototype.toString.call(els);
//     if (elType !== '[object Array]' && elType !== '[object NodeList]' &&
//             elType !== '[object HTMLCollection]'){
//       els = [els];
//     }

//     // Process each el we've passed.
//     for(var i = 0; i < els.length; i++){
//       processItem(els[i], settings);
//     }
//   };

//   /**
//    * The meat. Given an el, make the text inside it fit its parent.
//    * @param  {DOMElement} el       Child el.
//    * @param  {Object} settings     Options for fit.
//    */
//   function processItem(el, settings){
//     if (!isElement(el) || (!settings.reProcess && el.getAttribute('textFitted'))) {
//       return false;
//     }

//     // Set textFitted attribute so we know this was processed.
//     if(!settings.reProcess){
//       el.setAttribute('textFitted', 1);
//     }

//     var innerSpan, originalHeight, originalHTML, originalWidth;
//     var low, mid, high;

//     // Get element data.
//     originalHTML = el.innerHTML;
//     originalWidth = innerWidth(el);
//     originalHeight = innerHeight(el);

//     // Don't process if we can't find box dimensions
//     if (!originalWidth || (!settings.widthOnly && !originalHeight)) {
//       if(!settings.widthOnly)
//         throw new Error('Set a static height and width on the target element ' + el.outerHTML +
//           ' before using textFit!');
//       else
//         throw new Error('Set a static width on the target element ' + el.outerHTML +
//           ' before using textFit!');
//     }

//     // Add textFitted span inside this container.
//     if (originalHTML.indexOf('textFitted') === -1) {
//       innerSpan = document.createElement('span');
//       innerSpan.className = 'textFitted';
//       // Inline block ensure it takes on the size of its contents, even if they are enclosed
//       // in other tags like <p>
//       innerSpan.style['display'] = 'inline-block';
//       innerSpan.innerHTML = originalHTML;
//       el.innerHTML = '';
//       el.appendChild(innerSpan);
//     } else {
//       // Reprocessing.
//       innerSpan = el.querySelector('span.textFitted');
//       // Remove vertical align if we're reprocessing.
//       if (hasClass(innerSpan, 'textFitAlignVert')){
//         innerSpan.className = innerSpan.className.replace('textFitAlignVert', '');
//         innerSpan.style['height'] = '';
//         el.className.replace('textFitAlignVertFlex', '');
//       }
//     }

//     // Prepare & set alignment
//     if (settings.alignHoriz) {
//       el.style['text-align'] = 'center';
//       innerSpan.style['text-align'] = 'center';
//     }

//     // Check if this string is multiple lines
//     // Not guaranteed to always work if you use wonky line-heights
//     var multiLine = settings.multiLine;
//     if (settings.detectMultiLine && !multiLine &&
//         innerSpan.getBoundingClientRect().height >= parseInt(window.getComputedStyle(innerSpan)['font-size'], 10) * 2){
//       multiLine = true;
//     }

//     // If we're not treating this as a multiline string, don't let it wrap.
//     if (!multiLine) {
//       el.style['white-space'] = 'nowrap';
//     }

//     low = settings.minFontSize;
//     high = settings.maxFontSize;

//     // Binary search for highest best fit
//     var size = low;
//     while (low <= high) {
//       mid = (high + low) >> 1;
//       innerSpan.style.fontSize = mid + 'px';
//       var innerSpanBoundingClientRect = innerSpan.getBoundingClientRect();
//       if (
//         innerSpanBoundingClientRect.width <= originalWidth
//         && (settings.widthOnly || innerSpanBoundingClientRect.height <= originalHeight)
//       ) {
//         size = mid;
//         low = mid + 1;
//       } else {
//         high = mid - 1;
//       }
//       // await injection point
//     }
//     // found, updating font if differs:
//     if( innerSpan.style.fontSize != size + 'px' ) innerSpan.style.fontSize = size + 'px';

//     // Our height is finalized. If we are aligning vertically, set that up.
//     if (settings.alignVert) {
//       addStyleSheet();
//       var height = innerSpan.scrollHeight;
//       if (window.getComputedStyle(el)['position'] === "static"){
//         el.style['position'] = 'relative';
//       }
//       if (!hasClass(innerSpan, "textFitAlignVert")){
//         innerSpan.className = innerSpan.className + " textFitAlignVert";
//       }
//       innerSpan.style['height'] = height + "px";
//       if (settings.alignVertWithFlexbox && !hasClass(el, "textFitAlignVertFlex")) {
//         el.className = el.className + " textFitAlignVertFlex";
//       }
//     }
//   }

//   // Calculate height without padding.
//   function innerHeight(el){
//     var style = window.getComputedStyle(el, null);
//     return el.getBoundingClientRect().height -
//       parseInt(style.getPropertyValue('padding-top'), 10) -
//       parseInt(style.getPropertyValue('padding-bottom'), 10);
//   }

//   // Calculate width without padding.
//   function innerWidth(el){
//     var style = window.getComputedStyle(el, null);
//     return el.getBoundingClientRect().width -
//       parseInt(style.getPropertyValue('padding-left'), 10) -
//       parseInt(style.getPropertyValue('padding-right'), 10);
//   }

//   //Returns true if it is a DOM element
//   function isElement(o){
//     return (
//       typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
//       o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
//     );
//   }

//   function hasClass(element, cls) {
//     return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
//   }

//   // Better than a stylesheet dependency
//   function addStyleSheet() {
//     if (document.getElementById("textFitStyleSheet")) return;
//     var style = [
//       ".textFitAlignVert{",
//         "position: absolute;",
//         "top: 0; right: 0; bottom: 0; left: 0;",
//         "margin: auto;",
//         "display: flex;",
//         "justify-content: center;",
//         "flex-direction: column;",
//       "}",
//       ".textFitAlignVertFlex{",
//         "display: flex;",
//       "}",
//       ".textFitAlignVertFlex .textFitAlignVert{",
//         "position: static;",
//       "}",].join("");

//     var css = document.createElement("style");
//     css.type = "text/css";
//     css.id = "textFitStyleSheet";
//     css.innerHTML = style;
//     document.body.appendChild(css);
//   }
// }));

import { useEffect, useMemo, useRef } from "react";
import useResizeObserver from "use-resize-observer";
import { useDebounce, useAnimationFrame } from "react-timing-hooks";
import $ from "jquery";
type TOptions = {
  fixedFontSizes?: number[] | "mangadex";
  maxFontSize?: number;
  minFontSize?: number;
  resolution?: number;
  depthLimit?: number;
  getWidthFn?: () => string | number | null;
  getHeightFn?: () => string | number | null;
};

const useFitTextTuViet = ({
  // mangadex setup:     setup(e) {
  //   const t = ["1.5rem", "1.3125rem", "1rem", "0.875rem"]
  //   , u = ["4.5rem", "4rem", "3.5rem", "3rem", "2.5rem", "2rem", "1.75rem", ...t]
  //   , r = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || (c => setTimeout(c, 1e3 / 60))
  //   , a = e
  //   , n = D(null)
  //   , o = {
  //     lock: !1,
  //     size: 0,
  //     lastSize: -1
  // }
  fixedFontSizes,
  maxFontSize,
  minFontSize,
  resolution,
  depthLimit = 10,
  getWidthFn,
  getHeightFn,
}: TOptions = {}) => {
  // fixed font sizes mode vs normal min/max mode
  ({ fixedFontSizes, maxFontSize, minFontSize, resolution } = useMemo(() => {
    if (fixedFontSizes === "mangadex")
      return {
        fixedFontSizes: [
          "4.5rem",
          "4rem",
          "3.5rem",
          "3rem",
          "2.5rem",
          "2rem",
          "1.75rem",
          "1.5rem",
          "1.3125rem",
          "1rem",
          "0.875rem",
        ]
          .map((s) => parseFloat(s) * 16)
          .sort((a, b) => a - b),
      };
    if (fixedFontSizes) {
      return {
        fixedFontSizes: fixedFontSizes.toSorted((a, b) => a - b),
      };
    }
    // min/max mode
    return {
      maxFontSize: maxFontSize ?? 4.5 * 16,
      minFontSize: minFontSize ?? 0.875 * 16,
      resolution: resolution ?? 0.05 * 16,
    };
  }, [fixedFontSizes, maxFontSize, minFontSize, resolution]));
  const ref = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const isCalculatingRef = useRef(false);
  const countRef = useRef(0);
  const moduleName = "[use-fit-text-tuviet]";
  const af = useAnimationFrame(() => {
    console.info(
      `${moduleName} animation count${countRef.current}, ffs${JSON.stringify(
        fixedFontSizes
      )}, mxfs${maxFontSize}, mnfs${minFontSize}`
    );
    const origEl = ref.current as HTMLDivElement;
    if (!origEl) return;
    countRef.current += 1;
    if (isCalculatingRef.current) return;
    // acquire lock
    isCalculatingRef.current = true;
    // clone element
    const cloneEl = $(origEl).clone();
    // define how to get dimensions
    if (!getWidthFn) getWidthFn = () => origEl.offsetWidth;
    if (!getHeightFn) getHeightFn = () => origEl.offsetHeight;
    const goalWidth = parseFloat((getWidthFn() as string) ?? 0);
    const goalHeight = parseFloat((getHeightFn() as string) ?? 0);
    console.info(`${moduleName} goal width${goalWidth}/height${goalHeight}`);
    if (!goalWidth || !goalHeight) {
      console.info(
        `${moduleName} width${goalWidth}/height${goalHeight} is null, element is not rendered? skipping`
      );
      return;
    }
    // mangadex impl:
    // g.style.position = "fixed",
    // g.style.visibility = "hidden",
    // g.style.left = -(f.width * 2) + "px",
    // g.style.top = -(x * 2) + "px",
    // g.style.width = f.width + "px",
    // g.style.height = x + "px";
    // hide the element from view
    cloneEl
      .css({
        position: "fixed",
        visibility: "hidden",
        left: -(goalWidth * 2) + "px",
        top: -(goalHeight * 2) + "px",
        width: goalWidth + "px",
        height: "auto",
      })
      .addClass("__fittexttuviet-clone");
    // styles won't be calculated if element not present in DOM
    $("body").append(cloneEl);
    // is fixed mode or range mode
    if (fixedFontSizes) {
      // fixed mode, just iterate
      console.info(`${moduleName} fixedmode`);
      // some utility functions
      const isOverflow = () => {
        const oh = cloneEl[0].scrollHeight > goalHeight;
        console.info(
          `${moduleName} overflow${cloneEl[0].scrollHeight}>${goalHeight}${oh}`
        );
        return oh;
      };
      const itos = (index: number) => fixedFontSizes[index];
      const sprintf = (index: number) => `${index}:${itos(index)}`;
      function setCloneFsi(index: number) {
        cloneEl.css("font-size", itos(index));
      }
      // whether failed or not, set the guessed font-size to the original element anyway
      function applySizeAndCleanUp(fsi: number) {
        console.info(`${moduleName} set fs to ${sprintf(fsi)}`);
        $(origEl).css("font-size", itos(fsi));
        // release lock
        $(cloneEl).remove();
        $(".__fittexttuviet-clone").remove();
        isCalculatingRef.current = false;
        console.info(`${moduleName} cleanup`);
      }
      // start iterating
      for (let current = fixedFontSizes.length - 1; current >= 0; current--) {
        console.info(
          `${moduleName} loop${fixedFontSizes.length - current} fs${sprintf(
            current
          )}`
        );
        setCloneFsi(current);
        if (!isOverflow()) {
          applySizeAndCleanUp(current);
          return;
        }
      }
      console.info(`${moduleName} mnfs${sprintf(0)} not fit`);
      applySizeAndCleanUp(0);
      return;
    }
    // range mode, use bisection
    console.info(`${moduleName} rangemode`);
    if (minFontSize == null || maxFontSize == null || resolution == null) {
      console.info(`${moduleName} invalid arguments`);
      return;
    }
    // some utility functions
    const isWithinResolution = () =>
      high == null ? false : Math.abs(low - high) <= resolution;
    const isOverflow = () => {
      const oh = cloneEl[0].scrollHeight > goalHeight;
      console.info(
        `${moduleName} overflow${cloneEl[0].scrollHeight}>${goalHeight}${oh}`
      );
      return oh;
    };
    const tryLastFit = () => {
      if (lastFit) {
        console.info(`${moduleName} bad try lastFit${lastFit} used`);
        current = lastFit;
      } else {
        console.info(`${moduleName} bad try mnfs${minFontSize} used`);
        current = minFontSize;
      }
    };
    function setCloneFs(mid: number) {
      cloneEl.css("font-size", mid);
    }
    // whether failed or not, set the guessed font-size to the original element anyway
    function applySizeAndCleanUp(fs: number) {
      $(origEl).css("font-size", fs);
      // release lock
      $(cloneEl).remove();
      $(".__fittexttuviet-clone").remove();
      isCalculatingRef.current = false;
      console.info(`${moduleName} cleanup`);
    }
    // try at max and min font size first
    setCloneFs(maxFontSize);
    if (!isOverflow()) {
      console.info(`${moduleName} best case max${maxFontSize} fit`);
      applySizeAndCleanUp(maxFontSize);
      return;
    } else console.info(`${moduleName} best case min${maxFontSize} not fit`);
    setCloneFs(minFontSize);
    if (isOverflow()) {
      console.info(`${moduleName} best case min${minFontSize} still overflow`);
      applySizeAndCleanUp(minFontSize);
      return;
    } else console.info(`${moduleName} best case min${minFontSize} still fit`);
    // setup to bisection
    let low = minFontSize;
    let high = maxFontSize;
    let current = parseFloat(window.getComputedStyle(cloneEl[0]).fontSize);
    let lastFit: number | null = null;
    for (let depth = 1; ; depth++) {
      const mid = depth === 1 ? current : (low + high) / 2;
      console.info(
        `${moduleName} begin loop${depth}, low${low}, high${high}, mid${mid}, lastFit${lastFit}`
      );
      if (depth > depthLimit) {
        console.info(`${moduleName} depth limit reached without fitting text`);
        tryLastFit();
        break;
      }
      // Return if the font size has been adjusted "enough" (change within `resolution`)
      // reduce font size by one increment if it's overflowing.
      if (isWithinResolution()) {
        if (isOverflow()) {
          console.info(
            `${moduleName} reached low${low}~high${high} still overflowing at current${current}, lastFit${lastFit}/mnfs${minFontSize}`
          );
          tryLastFit();
        } else {
          console.info(
            `${moduleName} completed fitting text at current${current}`
          );
        }
        break;
      } else if (low >= high) {
        // Binary search guard to adjust font size
        console.info(
          `${moduleName} reached low${low}>=high${high} probably found good size${current}`
        );
        break;
      }
      // Set the guessed font size to the element
      setCloneFs(mid);
      if (isOverflow()) {
        high = mid;
      } else {
        lastFit = low = mid;
      }
      console.info(
        `${moduleName} end loop${depth}, low${low}, high${high}, mid${mid}, lastFit${lastFit}`
      );
      current = mid;
    }
    applySizeAndCleanUp(current);
  });
  const rafId = useRef<number | null>(null);
  const db = useDebounce(() => {
    console.info(`${moduleName} debounce`);
    rafId.current = af();
  }, 200);
  const dbId = useRef<number | null>(null);
  useResizeObserver<HTMLDivElement>({
    // observe parent element instead (use case flexbox)
    ref: parentRef,
    onResize: ({ width, height }) => {
      console.info(`${moduleName} resize ${width}x${height}`);
      if (width && height) {
        dbId.current = db();
      }
    },
  });
  useEffect(() => {
    console.info(
      `${moduleName} mount rafId${rafId.current} dbId${dbId.current}`
    );
    dbId.current = db();
    return () => {
      console.info(
        `${moduleName} unmount rafId${rafId.current} dbId${dbId.current}`
      );
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (dbId.current) clearTimeout(dbId.current);
      // resize observer can stop automatically
    };
  }, [db, dbId, rafId]);
  return { ref, parentRef };
};

export default useFitTextTuViet;
