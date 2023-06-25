import PropTypes from 'ant-design-vue/es/_util/vue-types'

import 'ant-design-vue/es/layout/style'
import Layout from 'ant-design-vue/es/layout'
import ConfigProvider from 'ant-design-vue/es/config-provider'
import GridContent from './components/GridContent'
import TabsContent from './components/TabsContent'

const { Content } = Layout

const WrapContentProps = {
  isChildrenLayout: PropTypes.bool,
  location: PropTypes.any,
  tabsRender: PropTypes.any,
  contentHeight: PropTypes.number,
  contentWidth: PropTypes.oneOf(['Fluid', 'Fixed']).def('Fluid')
}

const WrapContent = {
  name: 'WrapContent',
  props: WrapContentProps,
  render(h) {
    const { isChildrenLayout, contentWidth, tabsRender } = this.$props
    return (
      <Content>
        <ConfigProvider
          getPopupContainer={(el, dialogContext) => {
            if (isChildrenLayout) {
              return el.parentNode()
            }
            return document.body
          }}
        >
          <div class="ant-pro-basicLayout-children-content-wrap">
            {(tabsRender && <TabsContent contentWidth={contentWidth}>{tabsRender}</TabsContent>) || null}
            <GridContent contentWidth={contentWidth}>{this.$slots.default}</GridContent>
          </div>
        </ConfigProvider>
      </Content>
    )
  }
}

export default WrapContent
