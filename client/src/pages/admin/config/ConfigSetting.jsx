import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setConfig } from '../../../redux';
import { TabView, TabPanel } from 'primereact/tabview';
const ConfigSetting = ({ setConfig, config }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div>
            <h1>Config Setting</h1>

            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Main Carousel">
                    <MainCarouselSetting />
                </TabPanel>
                <TabPanel header="About">
                    <AboutSetting />
                </TabPanel>
                <TabPanel header="Footer">
                    <FooterSetting />
                </TabPanel>
            </TabView>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        config: state.config
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setConfig: (data) => dispatch(setConfig(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConfigSetting)

const MainCarouselSetting = ({ }) => {
    return (
        <div>Main Carousel Setting</div>
    )
}

const AboutSetting = ({ }) => {
    return (
        <div>About Setting</div>
    )
}

const FooterSetting = ({ }) => {
    return (
        <div>Footer Setting</div>
    )
}