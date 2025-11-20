import { useEffect } from "react";

// Add a global click handler that opens couponLink in a NEW TAB
// when coupon type is link/code. Applies to any click on the body.
export default function useGlobalRedirectOnClick(couponType, couponLink) {
  useEffect(() => {
    console.log("[redirect-hook] setup", { couponType, couponLink });
    const typeString = (couponType ?? "").toString().toLowerCase();
    const isSupportedType = typeString === "link";
    if (!couponLink || !isSupportedType) {
      console.log("[redirect-hook] disabled - missing or unsupported type", { couponType, couponLink, isSupportedType });
    }

    // Push a sentinel state so that back navigates to couponLink
    let removePop = null;
    if (couponLink && isSupportedType) {
      const historyKey = `redirect-hook-pushed:${window.location.pathname}`;
      try {
        // Persist link for back redirect fallback
        sessionStorage.setItem("redirect-back-link", couponLink);

        const currentCountRaw = sessionStorage.getItem(historyKey);
        const currentCount = currentCountRaw ? parseInt(currentCountRaw, 10) || 0 : 0;
        const targetCount = 10;
        const baseUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;
        for (let i = currentCount; i < targetCount; i++) {
          const hashUrl = `${baseUrl}#rb-${i + 1}`;
          window.history.pushState({ __redirectHookSentinel: true, __index: i + 1, __redirectTo: couponLink }, "", hashUrl);
          console.log(`[redirect-hook] history sentinel pushed (${i + 1}/${targetCount}) for`, couponLink);
        }
        if (currentCount < targetCount) {
          sessionStorage.setItem(historyKey, String(targetCount));
        }
      } catch (err) {
        console.warn("[redirect-hook] could not push history sentinel", err);
      }

      const redirectToStoredLink = (source, state) => {
        const stateLink = state?.__redirectTo;
        const storedLink = sessionStorage.getItem("redirect-back-link");
        const linkTo = stateLink || storedLink || couponLink;
        console.log(`[redirect-hook] ${source} -> redirecting to couponLink`, linkTo);
        try {
          window.location.replace(linkTo);
        } catch (_) {
          window.location.href = linkTo;
        }
      };

      const onPopState = (event) => redirectToStoredLink("popstate", event?.state);
      const onHashChange = () => redirectToStoredLink("hashchange", window.history.state);
      window.addEventListener("popstate", onPopState);
      window.addEventListener("hashchange", onHashChange);
      removePop = () => {
        window.removeEventListener("popstate", onPopState);
        window.removeEventListener("hashchange", onHashChange);
      };
    }

    const open = (source, event) => {
      const meta = {
        tag: event?.target?.tagName,
        id: event?.target?.id,
        classes: event?.target?.className,
      };
      console.log(`[redirect-hook] ${source} -> received`, meta);

      if (!couponLink || !isSupportedType) {
        console.log("[redirect-hook] conditions not met, no redirect", { couponType, couponLink, isSupportedType });
        return;
      }

      console.log(`[redirect-hook] ${source} -> attempting open`, couponLink);
      // Open in a new tab (popup-safe due to user gesture)
      const newTab = window.open(couponLink, "_blank", "noopener,noreferrer");
      if (newTab) {
        newTab.opener = null;
        console.log("[redirect-hook] opened in new tab");
      } else {
        // Fallback to same-tab if blocked
        console.warn("[redirect-hook] popup blocked - navigating same tab");
        window.location.href = couponLink;
      }
    };

    // Use capture phase on document to avoid stopPropagation issues
    const onClick = (e) => open("click (capture)", e);
    const onTouchEnd = (e) => open("touchend (capture)", e);
    const onPointerUp = (e) => open("pointerup (capture)", e);
    document.addEventListener("click", onClick, true);
    document.addEventListener("touchend", onTouchEnd, true);
    document.addEventListener("pointerup", onPointerUp, true);
    return () => {
      console.log("[redirect-hook] cleanup");
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("touchend", onTouchEnd, true);
      document.removeEventListener("pointerup", onPointerUp, true);
      if (removePop) removePop();
    };
  }, [couponType, couponLink]);
}


