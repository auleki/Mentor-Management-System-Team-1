<template>
  <!-- Search Input -->
  <section v-if="showSearchField" class="flex gap-4 w-full">
    <button @click="toggleShowSearchField" class="mb-5">
      <GoBack />
    </button>
    <div class="w-full">
      <Input placeholder="Find a task..." />
    </div>
  </section>
  <div
    v-if="!showSearchField"
    class="flex justify-between pb-6 overflow-y-auto mt-4 w-full"
  >
    <h1 className="font-semibold text-2xl">Tasks</h1>
    <!-- Search & Filter Icon -->
    <div class="flex gap-3 mt-1 justify-end">
      <span class="cursor-pointer" @click="toggleShowSearchField">
        <IconSearch color="#058B94" />
      </span>
      <span class="cursor-pointer mt-1">
        <IconFilter />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconSearch } from "@/assets/icons";
import IconFilter from "../Icons/IconFilter.vue";
import GoBack from "@/assets/icons/GoBack.vue";
import Input from "../Forms/Input.vue";

type Props = {
  showSearchField: boolean;
  toggleShowSearchField: () => {};
};

defineProps<Props>();
</script>
