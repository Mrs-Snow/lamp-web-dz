<template>
  <RadioGroup v-model:value="template" style="margin-right: 2rem" @change="changeTabs">
    <RadioButton :value="TemplateEnum.BACKEND">后端</RadioButton>
    <RadioButton :value="TemplateEnum.WEB_PLUS">前端</RadioButton>
  </RadioGroup>

  <Tabs>
    <TabPane
      v-for="(value, key) in codeMap"
      :key="key"
      :tab="key.substring(key.lastIndexOf('/') + 1, key.indexOf('.ftl'))"
    >
      <pre>
        <a-button preIcon="ant-design:copy-outlined" style="float: left" type="link" @click="handleCopy(value)">复制</a-button>
        <code class="hljs" v-html="highlightedCode(value, key)"></code>
      </pre>
    </TabPane>
  </Tabs>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { Radio, Tabs } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { TemplateEnum } from '/@/enums/biz/tenant';
  import { previewCode } from '/@/api/devOperation/developer/defGenTable';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';

  import hljs from 'highlight.js/lib/core';
  import java from 'highlight.js/lib/languages/java';
  import xml from 'highlight.js/lib/languages/xml';
  import html from 'highlight.js/lib/languages/xml';
  import vue from 'highlight.js/lib/languages/xml';
  import web from 'highlight.js/lib/languages/xml';
  import javascript from 'highlight.js/lib/languages/javascript';
  import typescript from 'highlight.js/lib/languages/typescript';
  import sql from 'highlight.js/lib/languages/sql';
  // import 'highlight.js/styles/github.css';
  import 'highlight.js/styles/github-dark-dimmed.css';
  // import 'highlight.js/styles/base16/darcula.css';
  // import 'highlight.js/styles/dark.css';

  hljs.registerLanguage('java', java);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('html', html);
  hljs.registerLanguage('vue', vue);
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('sql', sql);
  hljs.registerLanguage('web', web);
  hljs.registerLanguage('ts', typescript);

  export default defineComponent({
    // 若需要开启页面缓存，请将此参数跟菜单名保持一致
    name: 'DefGenTablePreview',
    components: {
      Tabs,
      TabPane: Tabs.TabPane,
      RadioButton: Radio.Button,
      RadioGroup: Radio.Group,
    },
    setup() {
      const { t } = useI18n();
      const cacheMap = ref<any>({});
      const codeMap = ref<any>({});
      const tId = ref<string>('');
      const template = ref<TemplateEnum>(TemplateEnum.BACKEND);
      const { createMessage } = useMessage();
      const { clipboardRef, copiedRef } = useCopyToClipboard();

      const load = async (tableId) => {
        codeMap.value = {};
        tId.value = tableId;
        const map = await previewCode(tableId, template.value);
        codeMap.value = map;
        cacheMap.value[template.value] = map;
      };

      function highlightedCode(code, key) {
        const ftlName = key.substring(key.lastIndexOf('/') + 1, key.indexOf('.ftl'));
        const language = ftlName.substring(ftlName.indexOf('.') + 1, ftlName.length);
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

      async function changeTabs(e) {
        const template = e.target.value;
        if (cacheMap.value[template]) {
          codeMap.value = cacheMap.value[template];
        } else {
          codeMap.value = {};
          const map = await previewCode(tId.value, template);
          codeMap.value = map;
          cacheMap.value[template] = map;
        }
      }

      return {
        t,
        codeMap,
        highlightedCode,
        handleCopy,
        load,
        changeTabs,
        TemplateEnum,
        template,
      };
    },
  });
</script>
<style lang="less" scoped>
  pre {
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
  }
</style>
