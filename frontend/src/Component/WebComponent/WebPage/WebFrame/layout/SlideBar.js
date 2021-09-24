import Animated from 'animated/lib/targets/react-dom';
import Easing from 'animated/lib/Easing';
import {Component} from "react";
import NavigationBar from "../index";


class SlideBar extends Component {
    animatedValue = new Animated.Value(0)
    animate = () => {
        this.animatedValue.setValue(0)
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.elastic(1)
            }
        ).start();
    }
    render() {
        const marginLeft = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-120, 0],
        })
        return (
            <div className="App">
                {/*<div*/}
                {/*    // style={styles.button}*/}
                {/*    onClick={this.animate}>Animate</div>*/}

                <Animated.div
                    style={
                        Object.assign(
                            {},
                            // styles.box,
                            { opacity: this.animatedValue, marginLeft })}>
                    <NavigationBar
                        open={this.props.open}
                        setOpen={this.props.setOpen}
                        logout={this.props.logout}
                        onClick={this.animate}
                    />
                </Animated.div>
            </div>
        );
    }
}
export default SlideBar