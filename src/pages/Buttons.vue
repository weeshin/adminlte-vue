<template>
  <NixCard>
    <div class="row">
      <div class="col-2">
        <NixButton block>Default</NixButton>
      </div>
      <div class="col-2">
        <NixButton block size="large">Default</NixButton>
      </div>
      <div class="col-2">
        <NixButton block size="small">Default</NixButton>
      </div>
      <div class="col-2">
        <NixButton block size="x-small">Default</NixButton>
      </div>
      <div class="col-2">
        <NixButton block flat>Default</NixButton>
      </div>      
      <div class="col-2">
        <NixButton block disabled>Default</NixButton>
      </div>      
    </div>
    <div class="row">
      <div class="col-2">
        <NixButton block btn-style="primary">Primary</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="primary" size="large">Primary</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="primary" size="small">Primary</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="primary" size="x-small">Primary</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="primary" flat>Primary</NixButton>
      </div>      
      <div class="col-2">
        <NixButton block btn-style="primary" disabled>primary</NixButton>
      </div>      
    </div>    
    <div class="row">
      <div class="col-2">
        <NixButton block btn-style="success">Success</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="success" size="large">Success</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="success" size="small">Success</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="success" size="x-small">Success</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="success" flat>Success</NixButton>
      </div>      
      <div class="col-2">
        <NixButton block btn-style="success" disabled>Success</NixButton>
      </div>      
    </div>   
    <div class="row">
      <div class="col-2">
        <NixButton block btn-style="info">Info</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="info" size="large">Info</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="info" size="small">Info</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="info" size="x-small">Info</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="info" flat>Info</NixButton>
      </div>      
      <div class="col-2">
        <NixButton block btn-style="info" disabled>Info</NixButton>
      </div>      
    </div>  
    <div class="row">
      <div class="col-2">
        <NixButton block btn-style="danger">danger</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="danger" size="large">danger</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="danger" size="small">danger</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="danger" size="x-small">danger</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="danger" flat>danger</NixButton>
      </div>      
      <div class="col-2">
        <NixButton block btn-style="danger" disabled>danger</NixButton>
      </div>      
    </div>  
    <div class="row">
      <div class="col-2">
        <NixButton block btn-style="warning">Warning</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="warning" size="large">Warning</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="warning" size="small">Warning</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="warning" size="x-small">Warning</NixButton>
      </div>
      <div class="col-2">
        <NixButton block btn-style="warning" flat>Warning</NixButton>
      </div>      
      <div class="col-2">
        <NixButton block btn-style="warning" disabled>Warning</NixButton>
      </div>      
    </div>  
  </NixCard>

  <NixCard>
    <NixCardHeader>Block Buttons</NixCardHeader>
    <NixCardBody>
      <NixButton block>.btn-block</NixButton>
      <NixButton block flat>.btn-block .btn-flat</NixButton>
      <NixButton block size="small">.btn-block .btn-sm</NixButton>
    </NixCardBody>
  </NixCard>

  <NixCard>
    <NixCardBody>
      <table class="table table-bordered table-responsive">
        <tr>
          <td>Button</td>
          <td>Icons</td>
          <td>Flat</td>
          <td>Dropdown</td>
        </tr>
        <tr>
          <td>
            <NixButtonGroup>
              <NixButton>Left</NixButton>
              <NixButton>Center</NixButton>
              <NixButton>Right</NixButton>
            </NixButtonGroup>
          </td>
          <td>
            <NixCard>
              <NixButtonGroup>
                <NixButton icon="fa fa-align-left"></NixButton>
                <NixButton icon="fa fa-align-center"></NixButton>
                <NixButton icon="fa fa-align-right"></NixButton>
              </NixButtonGroup>    
            </NixCard>
          </td>
          <td>
            <NixCard>
              <NixButtonGroup>
                <NixButton flat icon="fa fa-align-left"></NixButton>
                <NixButton flat icon="fa fa-align-center"></NixButton>
                <NixButton flat icon="fa fa-align-right"></NixButton>
              </NixButtonGroup>    
            </NixCard>
          </td>
          <td>
            <NixCard>
              <NixButtonGroup>
                <NixButton>1</NixButton>
                <NixButton>2</NixButton>
                <NixDropdownButton></NixDropdownButton>
              </NixButtonGroup>    
            </NixCard>
          </td>
        </tr>
      </table>      
    </NixCardBody>
  </NixCard>


</template>

<script setup lang="ts">
import NixButton from '@/components/button/NixButton.vue';
import NixButtonGroup from '@/components/button/NixButtonGroup.vue';
import NixDropdownButton from '@/components/button/NixDropdownButton.vue';
import NixCard from '@/components/card/NixCard.vue';
import NixCardBody from '@/components/card/NixCardBody.vue';
import NixCardHeader from '@/components/card/NixCardHeader.vue';

</script>