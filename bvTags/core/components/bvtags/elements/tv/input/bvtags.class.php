<?php

class BvTagsInputRender extends modTemplateVarInputRender
{
  public function getTemplate()
  {
    $corePath = $this->modx->getOption('bvtags.core_path', null,  $this->modx->getOption('core_path').'components/bvtags/');
    return $corePath . 'elements/tv/input/tpl/bvtags.render.tpl';
  }

  public function process($value, array $params = [])
  {
    $this->modx->regClientStartupScript($this->modx->getOption('assets_url') . 'components/bvtags/js/mgr/bvtags.input.js');
    $this->modx->regClientStartupHTMLBlock("
        <script>
        MODx.tvbvtagsTV = '{$this->tv->id}';
        MODx.tvbvtagsTV_default = " . json_encode($value) . ";
        </script>
        ");
    return '';
  }
}
return 'BvTagsInputRender';
