import React, { Component } from "react";
import LeftArrow from "../image/ArrowIconPointToLeft.svg";
import "./RecycleSliderStyle.scss";

class RecycleSlider extends Component {
    buttonArea = 100;
    countCanShow;
    indexOfFirstItemToShow = 0;
    itmes;
    state = { slice: null, leftMargin: null };

    constructor() {
        super();
        this.items = document.getElementsByClassName("slider-item");
    }
    componentWillMount() {
        this.calculateItemPosition();
        this.browserLastWidth = window.innerWidth;
        window.addEventListener("resize", this.browserResized);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.browserResized);
    }
    browserResized = async () => {
        if (this.browserLastWidth === window.innerWidth) return;
        setTimeout(() => {
            this.recalculateItemPosition();
        }, 500);
    };
    calculateItemPosition = () => {
        // Unpack some of props variables.
        let { itemCountToShow, children } = this.props;

        // Calculate width available based on browser width minus width needed for the two left and right buttons
        let widthAvailable = window.innerWidth - this.buttonArea * 2;

        // Set countCanShow to count of children count of children count if less than number you specified as itemCountToShow
        this.countCanShow =
            itemCountToShow >= children.length
                ? children.length
                : itemCountToShow;

        // Calculate the slice of each child
        let slice = widthAvailable / this.countCanShow;

        // Check if slice that calculated on the number of items you want to show is atleast larg as item width or not
        if (slice - this.props.itemWidth < 0) {
            let minimumItemMargin = 2;
            // If can not show the number of items that you wants, calculate the number of items we can show in the berowser with minimumItemMargin specifyed.
            this.countCanShow = Math.floor(
                widthAvailable / (this.props.itemWidth + minimumItemMargin)
            );

            // Calculate new slice with number of items we can show in the browser.
            slice = widthAvailable / this.countCanShow;
            window.console.warn(
                `The number of items you wanted to show need more width than it's accessible in the browser.\nSo we decrease it to ${this.countCanShow}.`
            );
        }
        let leftMargin = (slice - this.props.itemWidth) / 2;
        this.setState({ slice, leftMargin });
    };
    recalculateItemPosition = () => {
        this.indexOfFirstItemToShow = 0;
        this.calculateItemPosition();
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            item.style.opacity = i < this.countCanShow ? 1 : 0;
        }
        this.updateStateOfArrowButtons();
    };
    handleRightButtonClicked = () => {
        // Move all items one index to right.
        for (let i = 0; i <= this.props.children.length - 1; i++) {
            const item = this.items[i];
            item.style.left =
                (i - this.indexOfFirstItemToShow + 1) * this.state.slice +
                this.state.leftMargin +
                this.buttonArea +
                "px";

            // If it's the item that should enter the screen make its opacity one.
            if (i === this.indexOfFirstItemToShow) {
                this.items[i - 1].style.opacity = 1;
            }

            // If it's the item that should leave the screen make its opacity zero.
            if (i === this.indexOfFirstItemToShow + this.countCanShow - 1)
                item.style.opacity = 0;
        }
        this.indexOfFirstItemToShow--;
        this.updateStateOfArrowButtons();
    };
    handleLeftButtonClicked = () => {
        // Move all items one index to left.
        for (let i = 0; i <= this.props.children.length - 1; i++) {
            const item = this.items[i];
            item.style.left =
                (i - this.indexOfFirstItemToShow - 1) * this.state.slice +
                this.state.leftMargin +
                this.buttonArea +
                "px";

            // If it's the item that should leave the screen make its opacity zero.
            if (i === this.indexOfFirstItemToShow) item.style.opacity = 0;

            // If it's the item that should enter the screen make its opacity one.
            if (i === this.indexOfFirstItemToShow + this.countCanShow) {
                this.items[i].style.opacity = 1;
            }
        }
        this.indexOfFirstItemToShow++;
        this.updateStateOfArrowButtons();
    };
    updateStateOfArrowButtons = () => {
        const hasLeftItemToMove = this.indexOfFirstItemToShow > 0;
        if (hasLeftItemToMove)
            document.getElementById("slider-right-button").className = "show";
        else document.getElementById("slider-right-button").className = "";

        const hasRightItemToMove =
            this.indexOfFirstItemToShow + this.countCanShow <=
            this.items.length - 1;
        if (!hasRightItemToMove)
            document.getElementById("slider-left-button").className = "";
        else document.getElementById("slider-left-button").className = "show";
    };
    render() {
        return (
            <div className="recycle-slider">
                <div className="slider-arrow-button">
                    <button
                        id="slider-left-button"
                        onClick={this.handleLeftButtonClicked}
                        className={
                            this.countCanShow < this.props.children.length
                                ? "show"
                                : null
                        }
                    >
                        <img src={LeftArrow} alt="Slider Previous" />
                    </button>
                </div>
                {// Map every child to a div and set it's margin; And set it's opacity to one if it should be showen in the screen.
                this.props.children.map((item, index) => (
                    <div
                        key={index}
                        className="slider-item"
                        style={{
                            left:
                                index * this.state.slice +
                                this.state.leftMargin +
                                this.buttonArea,
                            opacity: index < this.countCanShow ? 1 : 0
                        }}
                    >
                        {item}
                    </div>
                ))}
                <div className="slider-arrow-button">
                    <button
                        id="slider-right-button"
                        onClick={this.handleRightButtonClicked}
                    >
                        <img src={LeftArrow} alt="Slider Next" />
                    </button>
                </div>
            </div>
        );
    }
}

export default RecycleSlider;
