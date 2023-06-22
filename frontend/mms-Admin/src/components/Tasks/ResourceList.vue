<template>
  <div class="w-7/12">
    <div class="justify-end flex items-center mb-12 gap-4">
      <IconSearch color="#058B94" />
      <IconFilter />
      <IconCancel />
    </div>

    <div class="flex gap-3 flex-col">
      <ResourceItem
        v-for="resource in resources"
        :isSelected="selectedResources.includes(resource.id)"
        :onClick="() => onClick(resource.id, resourceType)"
        :resource="resource"
        :selectedResources="$props.selectedResources"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref} from "vue";
import { IconSearch } from "@/assets/icons";
import IconFilter from "../Icons/IconFilter.vue";
import ResourceItem from "./ResourceItem.vue";
import IconCancel from "../Icons/IconCancel.vue";
import type { ITask, ResourceType } from "@/typings/components";
import { RESOURCE_TYPE } from "@/helpers/enum";

type Props = {
  resourceType: string;
  resources: ResourceType[];
  selectedResources: number[];
  onClick: (resourceId: number, resourceType: string) => void;
};

const props = defineProps<Props>();

const _selectedList = ref<{}[]>(props.selectedResources)

const updateList = (mentor: any) => {
  _selectedList.value.push(mentor)
}
onMounted(() => {
  console.log('Resource List', props.resources)
  console.log('Resource Type', props.resourceType)
})

defineEmits(['updateSelectedList'])

</script>
