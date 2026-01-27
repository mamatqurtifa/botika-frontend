<template>
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 bg-[#C4EBFC] rounded-2xl flex items-center justify-center">
      <img
        src="/avatar.png"
        class="w-8 h-8 rounded-full"
        @error="$event.target.src = '/default-avatar.png'"
      />
    </div>
    <div class="flex-1 min-w-0">
      <p class="font-semibold text-[#31738F] text-sm truncate">
        {{ userName }}
      </p>
      <p class="text-xs text-[#31738F] truncate">
        {{ userEmail }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  userName: {
    type: String,
    default: 'User',
  },
  userEmail: {
    type: String,
    default: 'email@example.com',
  },
})
</script>
