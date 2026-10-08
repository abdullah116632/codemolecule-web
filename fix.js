        if (nextIndex === 3) {
          // 1. Start transition: Hide browser and show phone
          setShowPhone(true);
          
          // 2. Wait for browser to mostly fade out so the content swap is invisible
          await sleep(300);
          if (!active) break;

          // 3. Switch index (updates Hero text and internal content)
          index = nextIndex;
          setCurrentIndex(nextIndex);
          onSlideChange?.(nextIndex);

          // 4. Wait for phone to fully settle
          await sleep(700);
          if (!active) break;

          // 5. Spring badges in
          setBadgeVisible(true);
        }
