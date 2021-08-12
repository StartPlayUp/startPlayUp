import React, { memo } from "react";
const gaugeWidth = 240;
const gaugeHeight = 50;
const gaugeContentWidth = gaugeWidth - 12;
const gaugeBarsNb = 10;
const gaugeBarWidth = gaugeContentWidth / gaugeBarsNb;
const gaugeBarMargin = 1;
const gaugeBarRadius = 10;

const styles = {
    container: {
        position: "relative",
        width: `${gaugeWidth}px`,
        height: `${gaugeHeight}px`,
    },
    barsContainer: {
        width: `${gaugeWidth}px`,
        height: `${gaugeHeight}px`,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "3px",
    },
    barContainer: {
        width: `${gaugeBarWidth}px`,
        height: `${gaugeHeight - 10}px`,
        paddingLeft: `${gaugeBarMargin}px`,
        paddingRight: `${gaugeBarMargin}px`,

    },
    bar: {
        width: `${gaugeBarWidth - gaugeBarMargin * 2}px`,
        height: "100%",
        // backgroundColor: "#3f5c8c",
        // 'background-image': 'linear-gradient(90deg, sky, red)',
        '--color-1': 'deepskyblue',
        '--color-2': 'navy',
        background: `linear-gradient(
            170deg,
            var(--color-1),
            var(--color-2) 90%
          )`,
        zIndex: 1,

        border: 'solid 3px black',
        'backgroundColor': 'white',

    },
    barFirst: {
        borderTopLeftRadius: `${gaugeBarRadius}px`,
        borderBottomLeftRadius: `${gaugeBarRadius}px`
    },
    barLast: {
        borderTopRightRadius: `${gaugeBarRadius}px`,
        borderBottomRightRadius: `${gaugeBarRadius}px`
    },
    bg: {
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        zIndex: 0
    },
    right: {
        // 'border-color': 'black',
        // 'box-shadow': '0px 0px 8px 2px #58cdf6',
    }
};

const Gauge = ({ counterHandler }) => {
    const percentage = counterHandler();
    const percent10 = Math.round(percentage / gaugeBarsNb);
    const percentageArray = [...Array(percent10).keys()];
    const lastPercentageArray = percentageArray.length - 1;

    return (
        <>
            <div style={styles.container}>
                <div style={styles.barsContainer}>
                    {percentageArray.map((i, index) => (
                        <div key={index} style={styles.barContainer}>
                            {index === 0 ? (
                                <div
                                    key={index}
                                    style={{ ...styles.bar, ...styles.barFirst }}
                                />
                            ) : index === gaugeBarsNb - 1 ? (
                                <div key={index} style={{ ...styles.bar, ...styles.barLast }} />
                            ) : (
                                index === lastPercentageArray ?
                                    (<div key={index} style={{ ...styles.bar, ...styles.right }} />)
                                    : (<div key={index} style={{ ...styles.bar }} />)

                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default memo(Gauge);