<script setup>
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import { Select } from '@/components/ui/select'
import { DollarSign } from 'lucide-vue-next'
</script>

<template>
  <section>
    <h1>Calculate Vehicle Bid</h1>
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="base-price">Base price</Label>
      <Input id="base-price" type="number" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <DollarSign class="size-6 text-muted-foreground" />
      </span>
    </div>
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="base-price"></Label>
      <!-- <Select></Select> -->
    </div>
    <Button type="button">Calculate</Button>
  </section>
  <div></div>
</template>

<style scoped></style>
