<template>
  <div style="width: 100%;  padding: 16px">
    <div style="display: flex;">
      <v-btn color="error" @click="$emit('resetEvent')">Clear</v-btn>
      <header style="justify-self: center; margin-left: auto; margin-right: auto; padding-top: 32px">This is the
        validation score for your
        {{ params.type }}-{{ params.mode }}
        input.
      </header>
    </div>
    <v-sheet style="margin-top: 16px;">
      <v-divider></v-divider>
      <v-progress-linear :color="error?'error':'primary'" indeterminate v-if="result===undefined"></v-progress-linear>
      <div v-else>
        <v-simple-table>
          <tr>
            <th></th>
            <th align="left">inputValues</th>
            <th align="left">pValues</th>
          </tr>
          <tr v-for="metric in Object.keys(result.input_values.value)" :key="metric">
            <td>{{ metric }}</td>
            <td>{{ result.input_values.value[metric] }}</td>
            <td>{{ result.p_values[metric] }}</td>
          </tr>
        </v-simple-table>
      </div>
      <span v-if="error"><i>An error occurred!</i></span>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "Results",


  props: {
    params: Object,
  },
  data() {
    return {
      result: undefined,
      error: false,
    }
  },

  created() {
    this.execute()
  },

  methods: {
    saveResult: function (result) {
      if (typeof result !== "object") {
        this.error = true
        return;
      }
      console.log(result)
      this.result = result
    },
    execute: function () {
      this.step = 2
      switch (this.params.mode) {
        case "set": {
          this.$http.validate_set(this.params.targetID, this.params.target, this.params.runs, this.params.replace, this.params.distance, this.params.background).then(response => {
            this.saveResult(response)
          }).catch(() => {
            this.error = true
          })
          break;
        }
        case "id-set": {
          this.$http.validate_id_set(this.params.targetID, this.params.target, this.params.referenceID, this.params.reference, this.params.runs, this.params.replace, this.params.enriched, this.params.distance, this.params.background).then(response => {
            this.saveResult(response)
          }).catch(() => {
            this.error = true
          })
          break
        }
        case "set-set": {
          this.$http.validate_set_set(this.params.targetID, this.params.target, this.params.referenceID, this.params.reference, this.params.runs, this.params.replace, this.params.enriched, this.params.distance, this.params.background).then(response => {
            this.saveResult(response)
          }).catch(() => {
            this.error = true
          })
          break
        }
        case "cluster": {
          this.$http.validate_cluster(this.params.targetID, this.params.target, this.params.runs, this.params.replace, this.params.distance, this.params.background).then(response=>{
            this.saveResult(response)
          }).catch(()=>{
            this.error=true
          })
        }
      }
    }

  }

}
</script>

<style scoped>

</style>