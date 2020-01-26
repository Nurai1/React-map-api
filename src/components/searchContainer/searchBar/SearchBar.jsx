import React from 'react'
import styled from 'styled-components'
import Downshift from 'downshift'

import getStreetList from './request'

const SearchInputLabel = styled.label`
  display: none;
  font-size: 13px;
  line-height: 14px;
  color: ${props=>props.theme.nonActiveColor};
  position: relative;
  top: 31px;
`;

const SearchInputWrapper = styled.input.attrs(props => ({
  placeholder: "Куда доставить?"
}))`
  width: 100%;
  font-size: 17px;
  line-height: 18px;
  color: ${props=>props.theme.primaryColor};
  margin: 19px 0 35px;
  padding: 4px 0;
  border: 0;
  border-bottom: 1px solid #eee;
  outline: 0;

  &::placeholder{
    color: ${props=>props.theme.nonActiveColor};
  }
  &:focus{
    border-bottom-color: #EFB8AF;
  }
`;

const StreetList = styled.ul`
  max-height: 215px;
  height: auto;
  overflow: hidden;
  font-size: 17px;
  line-height: 19px;
  color: ${props=>props.theme.primaryColor};
  padding: 0;

  & > li{
    height: 71px;
    box-sizing: border-box;
    border-bottom: 1px solid #EEE;
    list-style-type: none;
    padding: 15px 0;
  }

  & span.street{
    display: inline-block;
  }

  & span.region{
    font-size: 13px;
    line-height: 13px;
    color: ${props=>props.theme.nonActiveColor};
  }
`;


class SearchBar extends React.Component{

  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
    this.searchLabelRef = React.createRef();
    this.state={
      streetsList: [],
      chosenCoords: {lng: 30.3, lat: 59.95, "zoom": 17.5}
    }
  }

  isDownshiftFocus = () => {

    let searchBtn = document.querySelector('.search__button'),
        searchMPnt = document.querySelector('.search__mapPointer'),
        searchMPntArr = document.querySelector('.search__lctnIcn_arrow'),
        searchMPntMarker = document.querySelector('.search__lctnIcn_marker');

    let tempStyle =
      getComputedStyle(this.searchLabelRef.current).display==="none"?"block"
        :"none";

    this.searchLabelRef.current.style.display = tempStyle;

    if (tempStyle === "block"){
      this.searchInputRef.current.placeholder="";
      searchBtn.style.display = "none";
      searchMPnt.style.display = "inline-block";
      searchMPntArr.style.display = "none";
      searchMPntMarker.style.display = "inline-block";
    } else{
      this.searchInputRef.current.placeholder="Куда доставить?";
      searchBtn.style.display = "block";
      searchMPnt.style.display = "block";
      searchMPntArr.style.display = "inline-block";
      searchMPntMarker.style.display = "none";
    }

  }

  onStreetChosen = () => {

    let searchBtn = document.querySelector('.search__button'),
        searchMPntArr = document.querySelector('.search__lctnIcn_arrow'),
        searchMPntMarker = document.querySelector('.search__lctnIcn_marker');

    searchBtn.style.backgroundColor = "#121212";
    searchBtn.style.color = "#fff";
    searchMPntArr.style.display = "none";
    searchMPntMarker.style.display = "none";

    let chosenStreet = this.state.streetsList[0];

    let chosenStreetAddress = chosenStreet.data.street_type_full + " " + chosenStreet.data.street +
      (chosenStreet.data.house && chosenStreet.data.street_type_full!=="метро"?
      (", " + chosenStreet.data.house +
      (chosenStreet.data.block?(chosenStreet.data.block_type+chosenStreet.data.block):"")):"");

    this.props.setCoords({
      address_value: chosenStreetAddress,
      lng: chosenStreet.data.geo_lon,
      lat: chosenStreet.data.geo_lat
    });

  }

  changeQueryList = (count, value) => {
    if (count===1){
      getStreetList(
          (streets) => {
            this.setState({
              streetsList : streets
            })
            this.onStreetChosen();
        },
        value, count);
    }
        getStreetList(
            (streets) => {
              this.setState({
                streetsList : streets
              })
          },
          this.searchInputRef.current.value);
  }

  render(){
  return (
    <Downshift itemToString={
      item => (item ? item.data.street_type_full + " " + item.data.street +
      (item.data.house && item.data.street_type_full!=="метро"?
      (", " + item.data.house +
      (item.data.block?(item.data.block_type+item.data.block):"")):"") : '')
    }
       onChange={selectedItem => {this.changeQueryList(1, selectedItem.unrestricted_value)}}
       >
    {({
       getInputProps,
       getItemProps,
       getLabelProps,
       getMenuProps,
       isOpen,
       inputValue,
       highlightedIndex,
       selectedItem,
       getRootProps,
       clearItems
    }) =>{
      return (
       <div>
         <SearchInputLabel htmlFor="searchInput" ref={this.searchLabelRef}>
            Куда доставить?
         </SearchInputLabel>
          <SearchInputWrapper {...getInputProps()} ref={this.searchInputRef}
            id="searchInput" onInput={this.changeQueryList}
            onFocus={this.isDownshiftFocus} onBlur={this.isDownshiftFocus}/>
         <StreetList {...getMenuProps()}>
            {
              isOpen
                ?  this.state.streetsList
                  .filter(item => item.data.street!==null)
                  .map((item, index) => {
                    return (
                      <li
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                          style: {
                            borderBottomColor:
                              highlightedIndex === index ? '#EFB8AF' : '#EEE',
                          },
                        })}
                      >
                        <span className="street">{
            (item.data.street_type_full!=="метро"?
            (item.data.street_type_full + " "):"") +
            (item.data.street?item.data.street:"") +
            (item.data.house?(", " + item.data.house):"") +
            (item.data.block?(item.data.block_type+item.data.block):"")}
                        </span><br/>
                        <span className="region">{
                          item.data.street_type_full==="метро"?
                          item.data.street_type_full.charAt(0).toUpperCase() +
                          item.data.street_type_full.slice(1) +
                          ", " + item.data.city:
                          item.data.city
                        }</span>
                      </li>
                    )
                  })
              : null}
          </StreetList>
        </div>
      )
    }}
    </Downshift>
  )}
}

export default SearchBar
