import React, {useState, useEffect} from "react";
import LeftArrow from "../image/ArrowIconPointToLeft.svg";
import "./RecycleSliderStyle.scss";

const buttonArea = 100;
let countCanShow = null;
let indexOfFirstItemToShow = 0;
let browserLastWidth = null;
let items = null;

function RecycleSlider(props) {
    const [{slice, leftMargin}, setSliceAndLeftMargin] = useState({slice: null, leftMargin: null});
    items = document.getElementsByClassName("slider-item");

    useEffect(() => {
        calculateItemPosition();
        browserLastWidth = window.innerWidth;
        window.addEventListener("resize", debouncedWindowsResized);
        return () => {
            window.removeEventListener("resize", debouncedWindowsResized);
        };
    }, []);

    const onWindowsResized = () => {
        if (browserLastWidth === window.innerWidth) return;
        recalculateItemPosition();
        browserLastWidth = window.innerWidth;
    };
    const debouncedWindowsResized = debounce(onWindowsResized, 500);
    const calculateItemPosition = () => {
        // Unpack some of props variables.
        let {itemCountToShow, children, itemWidth} = props;

        // Calculate width available based on browser width minus width needed for the two left and right buttons
        let widthAvailable = window.innerWidth - buttonArea * 2;

        // Set countCanShow to count of children count of children count if less than number you specified as
        // itemCountToShow
        countCanShow = itemCountToShow >= children.length
                       ? children.length
                       : itemCountToShow;

        // Calculate the slice of each child
        let slice = widthAvailable / countCanShow;

        // Check if slice that calculated on the number of items you want to show is at least  large as item width or
        // not
        if (slice < itemWidth) {
            let minimumItemMargin = 2;
            // If can not show the number of items that you wants, calculate the number of items we can show in the
            // browser with minimumItemMargin specified.
            countCanShow = Math.floor(widthAvailable / (itemWidth + minimumItemMargin));

            // Calculate new slice with number of items we can show in the browser.
            slice = widthAvailable / countCanShow;
            window.console.warn(
                `The number of items you wanted to show need more width than it's accessible in the browser.\nSo we decrease it to ${countCanShow}.`
            );
        }
        let leftMargin = (slice - itemWidth) / 2;
        setSliceAndLeftMargin({slice, leftMargin});
    };
    const recalculateItemPosition = () => {
        indexOfFirstItemToShow = 0;
        calculateItemPosition();
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            item.style.opacity = i < countCanShow
                                 ? 1
                                 : 0;
        }
        updateStateOfArrowButtons();
    };
    const handleLeftButtonClicked = () => {
        // Move all items one index to right.
        for (let i = 0; i <= props.children.length - 1; i++) {
            const item = items[i];
            item.style.left = (i - indexOfFirstItemToShow + 1) * slice + leftMargin + buttonArea + "px";

            // If it's the item that should enter the screen make its opacity one.
            if (i === indexOfFirstItemToShow) {
                items[i - 1].style.opacity = 1;
            }

            // If it's the item that should leave the screen make its opacity zero.
            if (i === indexOfFirstItemToShow + countCanShow - 1) item.style.opacity = 0;
        }
        indexOfFirstItemToShow--;
        updateStateOfArrowButtons();
    };
    const handleRightButtonClicked = () => {
        // Move all items one index to left.
        for (let i = 0; i <= props.children.length - 1; i++) {
            const item = items[i];
            item.style.left = (i - indexOfFirstItemToShow - 1) * slice + leftMargin + buttonArea + "px";

            // If it's the item that should leave the screen make its opacity zero.
            if (i === indexOfFirstItemToShow) item.style.opacity = 0;

            // If it's the item that should enter the screen make its opacity one.
            if (i === indexOfFirstItemToShow + countCanShow) {
                items[i].style.opacity = 1;
            }
        }
        indexOfFirstItemToShow++;
        updateStateOfArrowButtons();
    };
    const updateStateOfArrowButtons = () => {
        const hasLeftItemToMove = indexOfFirstItemToShow > 0;
        if (hasLeftItemToMove) document.getElementById("slider-left-button").className = "show";
        else document.getElementById("slider-left-button").className = "";

        const hasRightItemToMove = indexOfFirstItemToShow + countCanShow <= items.length - 1;
        if (!hasRightItemToMove) document.getElementById("slider-right-button").className = "";
        else document.getElementById("slider-right-button").className = "show";
    };

    return (
        props.children &&
        props.children.length > 0 && (
            <div className="recycle-slider">
                <div className="slider-arrow-button">
                    <button
                        id="slider-left-button"
                        onClick={handleLeftButtonClicked}>
                        <img src={LeftArrow} alt="Slider Previous"/>
                    </button>
                </div>
                {// Map every child to a div and set it's margin; And set it's opacity to one if it should be showen in the screen.
                    props.children.map((item, index) => (
                        <div
                            key={index}
                            className="slider-item"
                            style={{
                                left: index * slice + leftMargin + buttonArea,
                                opacity: index < countCanShow
                                         ? 1
                                         : 0
                            }}
                        >
                            {item}
                        </div>
                    ))}
                <div className="slider-arrow-button">
                    <button className={countCanShow < props.children.length
                                       ? "show"
                                       : null}
                            id="slider-right-button" onClick={handleRightButtonClicked}>
                        <img src={LeftArrow} alt="Slider Next"/>
                    </button>
                </div>
            </div>
        )
    );
}

export default RecycleSlider;

// Debounce function will take a function and terminate all calls to the function with interval lower than "wait"
// seconds and call the function after "wait" seconds after last call to the function. Its also has a boolean called
// "immediate" to call the function immediately based on this parameters.
function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        }, wait);
        if (callNow) func.apply(context, args);
    };
}
