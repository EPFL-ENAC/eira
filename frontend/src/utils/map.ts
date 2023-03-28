import SelectedArea from "@/components/SelectedArea.vue";
import type { IControl } from "maplibre-gl";
import { h, type VNode } from "vue";

export class LayerSelectorControl implements IControl {
  private node: VNode | undefined;
  onAdd() {
    this.node = h(SelectedArea, { props: { area: 42 } });
    return this.node as unknown as HTMLElement;
  }

  onRemove() {
    console.log("onRemove");
  }
}
