#!/bin/sh
cd "$(dirname "$0")"
cat mods1.js mods2.js q1.js q2.js data3.js atlas1.js vert.js atlas2.js atlas3.js k3d.js a3d_base.js a3d_a.js a3d_b.js a3d_c.js rp.js app_head.js games.js cbt.js app_tail.js > all.js
{ cat shell.html; echo '<script>'; cat all.js; echo '</script>'; } > index.html
