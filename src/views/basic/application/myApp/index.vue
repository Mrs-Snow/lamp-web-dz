<template>
  <PageWrapper dense contentFullHeight> 123 </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  // import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    name: '应用管理',
    components: { PageWrapper },
    setup() {
      const { t } = useI18n();
      // const { createMessage } = useMessage();

      return {
        t,
      };
    },
  });
</script>
