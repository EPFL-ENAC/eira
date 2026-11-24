// vue-i18n 9.14 adds $t, $tm, $rt, $i18n... to the "vue" module. With Vue 3.4,
// templates read these properties from "@vue/runtime-core", so they don't see
// them. Declare them there.
import type { Composer, ExportedGlobalComposer, VueI18n } from "vue-i18n";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $i18n: VueI18n | ExportedGlobalComposer;
    $t: Composer["t"];
    $rt: Composer["rt"];
    $te: Composer["te"];
    $tm: Composer["tm"];
    $d: Composer["d"];
    $n: Composer["n"];
  }
}
