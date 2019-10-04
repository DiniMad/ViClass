import React, { Component } from "react";
import LeftArrow from "../image/ArrowIconPointToLeft.svg";
import "./RecycleSliderStyle.scss";

class RecycleSlider extends Component {
    buttonArea = 100;
    slice;
    leftMargin;
    countCanShow;
    indexOfFirstItemToShow = 0;
    itmes = null;
    state = {};

    constructor() {
        super();
        this.items = document.getElementsByClassName("slider-item");
    }
    componentWillMount() {
        this.calculateItemPosition();
    }
    calculateItemPosition = () => {
        // Calculate width available based on browser width minus width needed for the two left and right buttons
        let widthAvailable = window.innerWidth - this.buttonArea * 2;
        this.countCanShow = this.props.itemCountToShow;

        // Calculate the slice of each child
        this.slice = widthAvailable / this.countCanShow;

        // Check if slice that calculated on the number of items you want to show is atleast larg as item width or not
        if (this.slice - this.props.itemWidth < 0) {
            let minimumItemMargin = 2;
            // If can not show the number of items that you wants, calculate the number of items we can show in the berowser with minimumItemMargin specifyed.
            this.countCanShow = Math.floor(
                widthAvailable / (this.props.itemWidth + minimumItemMargin)
            );

            // Calculate new slice with number of items we can show in the browser.
            this.slice = widthAvailable / this.countCanShow;
            window.console.warn(
                `The number of items you wanted to show need more width than it's accessible in the browser.\nSo we decrease it to ${this.countCanShow}.`
            );
        }
        this.leftMargin = (this.slice - this.props.itemWidth) / 2;
    };
    handleRightButtonClicked = () => {
        // Move all items one index to right.
        for (let i = 0; i <= this.props.children.length - 1; i++) {
            const item = this.items[i];
            item.style.left =
                (i - this.indexOfFirstItemToShow + 1) * this.slice +
                this.leftMargin +
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
        this.UpdateStateOfArrowButtons();
    };
    handleLeftButtonClicked = () => {
        // Move all items one index to left.
        for (let i = 0; i <= this.props.children.length - 1; i++) {
            const item = this.items[i];
            item.style.left =
                (i - this.indexOfFirstItemToShow - 1) * this.slice +
                this.leftMargin +
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
        this.UpdateStateOfArrowButtons();
    };
    UpdateStateOfArrowButtons = () => {
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
                                index * this.slice +
                                this.leftMargin +
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
