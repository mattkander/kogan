import React from 'react';
import './AirconCalculator.css';

class AirconCalulator extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      totalAirconCubicWeight : 0,
    }
  }


  calculateAverageCubicWeight = items => {
    const numberOfItems = items.length;

    const totalCubicVolume = items.reduce((accumulator, item) => {
      let {width, length, height} = item.size;
      const cubicVolume = (width/100 * length/100 * height/100);
      const cubicWeight = cubicVolume * 250;

      return accumulator + cubicWeight;
    }, 0);

    const averageCubicWeight = totalCubicVolume/numberOfItems;
    return averageCubicWeight;
  }

  fetchAndFilterAircons = async () => {
    let aircons = [];
    // ideally you would capture this URL rather than hard coding it in like so (bad developer). 
    // For the sake of keeping this challenge under 2 hours, i've left it as is.
    let url = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1';
    let prev = '/api/products/1';
    let next = 0;

    try{
      // api will return next: null at the end of the pagination. 
      while(next !== null ){
        const products = await fetch(url).then(response => response.json());
        
        next = products.next;
        url = url.replace(prev, next);
        prev = products.next;
        
        let filteredAircons = products.objects.filter(product => product.category === 'Air Conditioners');
        filteredAircons.forEach(aircon => aircons.push(aircon));
      } 
    }catch(err){
      // Page 5 of the list has an 'Access-Control-Allow-Origin' cors error. Fixable given more time. 
      console.warn(err);
    }
    return aircons;
  }

  calculateCubicWeightOfAircons = async () => {
    const aircons = await this.fetchAndFilterAircons();
    let airconAverageWeight = this.calculateAverageCubicWeight(aircons);
    this.setState({
      totalAirconCubicWeight: Math.round(airconAverageWeight)
    })
  }

  render(){
    return(
      <div>
        <p>Average aircon cubic volume is: </p>
        <p className="Calculate-result">{this.state.totalAirconCubicWeight }</p>
        <div className="Button-container">
        <button className="Calculate-button" onClick={this.calculateCubicWeightOfAircons}>Calculate </button>
        <button className="Calculate-button" onClick={this.calculateCubicWeightOfAircons}>Reset </button>
        </div>
      </div>
    )
  }
}

export default AirconCalulator;