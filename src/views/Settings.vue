<template>
<div class="content pt-3">
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Settings</h3>
      </div>
      <div class="card-body">
        <div class="mb-2">
          <label>Application Name</label>
          <input type="text" v-model="settings.appName" class="form-control"/>
        </div>
        <div class="mb-2">
          <label>Version</label>
          <input type="text" v-model="settings.version" class="form-control"/>
        </div>
        <div class="mb-2">
          <label>Admin Email</label>
          <input type="email" v-model="settings.email" class="form-control"/>
        </div>
        <button class="btn btn-success btn-sm mt-2" @click="saveSettings">Save Settings</button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from "vue";

const settings = ref({
  appName: 'Fleet Management',
  version: '1.0.0',
  email: 'admin@fleet.com'
});

const saveSettings = ()=>{ alert('Settings saved!'); };
</script>

<style scoped>
.table th, .table td{ vertical-align: middle; }
</style>
