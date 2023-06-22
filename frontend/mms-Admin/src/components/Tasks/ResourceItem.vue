<template>
  <div
    class="inline-flex items-center border-2 border-gray-100 rounded-md p-4 gap-4"
  >
    <img
      src="https://i.pravatar.cc/300"
      class="w-20 h-auto rounded-full object-cover"
      alt=""
      srcset=""
    />
    <section class="flex flex-col">
      <h3 class="font-bold text-xl">{{ resource.name }}</h3>
      <span class="text-gray-300">Program Assistant, Andela, She/her</span>
      <div class="flex gap-2">
        <span class="bg-green-200 p-2 rounded-md">PROGRAM ASST.</span>
        <span class="bg-green-200 p-2 rounded-md">MENTOR-GADS</span>
      </div>
    </section>
    <span
      @click="() => onClick(resource.id, RESOURCE_TYPE.MENTORS)"
      class="cursor-pointer active:mt-3"
    >
      <IconAdd
        color="#058B94"
        v-if="!_isSelected"
      />
      <IconTick
        color="#058B94"
        v-else-if="_isSelected"
      />
    </span>
  </div>
</template>

<!-- <script lang="ts">
export default {}
</script> -->

<script setup lang="ts">
import type { ResourceType } from "@/typings/components";
import { IconAdd } from "../Icons";
import IconTick from "../Icons/IconTick.vue";
import { ref, computed, onMounted } from "vue";
import { RESOURCE_TYPE } from "@/helpers/enum";

type Props = {
  resource: ResourceType;
  isSelected: boolean
  onClick: (id: number, resourceType: string) => void;
  selectedResources: number[];
};
const props = defineProps<Props>()

const _isSelected = computed(() => props.selectedResources.includes(props.resource.id))

onMounted(() => {
  console.log('selectedRESSS', props.selectedResources)
})

const emit = defineEmits(["selectResource"]);


</script>
