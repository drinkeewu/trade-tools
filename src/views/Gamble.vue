<template>
  <div class="gamble">
    <div class="gamble-view">
      <NavBar
        class="navbar"
        title="回报计算"
      />
      <el-form
        label-position="right"
        label-width="140px"
      >
        <template v-for="item in inputFields">
          <el-form-item :label="item.label">
            <template v-if="item.prop === 'money_manage'">
              <el-radio-group
                v-model="config[item.prop]"
              >
                <el-radio label="line">
                  线性
                </el-radio>
                <el-radio label="compound_interest">
                  复利
                </el-radio>
              </el-radio-group>
            </template>
            <el-input
              v-else
              v-model="config[item.prop]"
            />
          </el-form-item>
        </template>
        <el-form-item label="回报倍速">
          <span style="font-weight: bold;font-size: 18px">
            {{ result }}
          </span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { ElInput, ElForm, ElFormItem, ElRadioGroup, ElRadio } from 'element-plus'
function getFloorTwo (num) {
  return Math.floor(num * 100) / 100
}
export default {
  name: 'Gamble',
  components: {
    NavBar,
    ElInput,
    ElForm,
    ElFormItem,
    ElRadioGroup,
    ElRadio
  },
  data () {
    return {
      config: {
        start_cash: 1000, // 初始启动资金
        round_num: 500, // 回合次数
        R: 2, // 盈亏比
        lose_percent: 2, // 单次止损百分比
        win_rate: 40, // 胜率
        money_manage: 'compound_interest' // 资金管理
      },
      inputFields: [
        { label: '初始启动资金', prop: 'start_cash' },
        { label: '回合次数', prop: 'round_num' },
        { label: '盈亏比(R)', prop: 'R' },
        { label: '单次止损百分比(%)', prop: 'lose_percent' },
        { label: '胜率(%)', prop: 'win_rate' },
        { label: '资金管理', prop: 'money_manage' }
      ]
    }
  },
  computed: {
    result: function () {
      const { start_cash, round_num, R, lose_percent, win_rate, money_manage } = this.config

      let now_cash = start_cash
      const win_round_num = Math.round(round_num * win_rate / 100)
      const lose_round_num = Math.round(round_num * (1 - win_rate / 100))

      if (money_manage === 'compound_interest') {
        for (let i = 0; i < round_num; i++) {
          if (i < lose_round_num) {
            now_cash = getFloorTwo(now_cash * (1 - (lose_percent / 100)))
            // console.log(now_cash);
          }
          if (i < win_round_num) {
            now_cash = getFloorTwo(now_cash * (1 + (lose_percent / 100 * R)))
            // console.log(now_cash);
          }
        }
      } else {
        for (let i = 0; i < round_num; i++) {
          if (i < lose_round_num) {
            now_cash -= getFloorTwo(start_cash * lose_percent / 100)
            // console.log(now_cash);
          }
          if (i < win_round_num) {
            now_cash += getFloorTwo(start_cash * lose_percent / 100 * R)
            // console.log(now_cash);
          }
        }
      }
      return getFloorTwo(now_cash / start_cash)
    }
  }
}
</script>

<style lang="scss" scoped>
.gamble {
  display: flex;
  // padding-top: 100px;
  justify-content: center;
  // background: #F7F8FA;
  height: 100vh;
  box-sizing: border-box;
  .navbar {
    margin-bottom: 10px;
  }
  &-view {
    padding: 20px;
    width: 100%;
    max-width: 450px;
    box-sizing: border-box;
  }
  @media only screen and (max-width: 450px) {
    padding-top: 0;
  }
}
</style>
