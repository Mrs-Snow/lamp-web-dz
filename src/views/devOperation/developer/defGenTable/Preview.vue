<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    width="70%"
    :keyboard="true"
    :maskClosable="true"
    title="预览代码"
    :defaultFullscreen="true"
    @ok="handleSubmit"
  >
    <Tabs>
      <TabPane
        :tab="key.substring(key.lastIndexOf('/') + 1, key.indexOf('.ftl'))"
        :key="key"
        v-for="(value, key) in codeMap"
      >
        <a-button type="link" @click="handleCopy(value)" style="float: right">复制</a-button>
        <pre>
          <code class="hljs" v-html="highlightedCode(value, key)"></code>
        </pre>
      </TabPane>
    </Tabs>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { Tabs } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { previewCode } from '/@/api/devOperation/developer/defGenTable';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';

  import hljs from 'highlight.js/lib/core';
  import java from 'highlight.js/lib/languages/java';
  import xml from 'highlight.js/lib/languages/xml';
  import html from 'highlight.js/lib/languages/xml';
  import vue from 'highlight.js/lib/languages/xml';
  import javascript from 'highlight.js/lib/languages/javascript';
  import sql from 'highlight.js/lib/languages/sql';
  // import 'highlight.js/styles/github.css';
  import 'highlight.js/styles/base16/darcula.css';
  // import 'highlight.js/styles/dark.css';

  hljs.registerLanguage('java', java);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('html', html);
  hljs.registerLanguage('vue', vue);
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('sql', sql);

  export default defineComponent({
    // 若需要开启页面缓存，请将此参数跟菜单名保持一致
    name: 'DefGenTablePreview',
    components: {
      BasicModal,
      Tabs,
      TabPane: Tabs.TabPane,
    },
    setup() {
      const { t } = useI18n();
      const codeMap = ref<any>({});
      const { createMessage } = useMessage();
      const { clipboardRef, copiedRef } = useCopyToClipboard();

      const [registerModal, { setModalProps }] = useModalInner(async (row) => {
        setModalProps({ confirmLoading: false });
        const map = await previewCode(row.record.id);
        codeMap.value = map;
      });

      function handleSubmit() {}

      function highlightedCode(code, key) {
        const ftlName = key.substring(key.lastIndexOf('/') + 1, key.indexOf('.ftl'));
        var language = ftlName.substring(ftlName.indexOf('.') + 1, ftlName.length);
        debugger;
        const result = hljs.highlight(code || '', { language, ignoreIllegals: true });
        return result.value || '&nbsp;';
      }

      function handleCopy(value) {
        if (!value) {
          createMessage.warning('当前页面无内容，无需复制。');
          return;
        }
        clipboardRef.value = value;
        if (unref(copiedRef)) {
          createMessage.success('复制成功！');
        }
      }

      return {
        t,
        registerModal,
        handleSubmit,
        codeMap,
        highlightedCode,
        handleCopy,
      };
    },
  });
</script>
