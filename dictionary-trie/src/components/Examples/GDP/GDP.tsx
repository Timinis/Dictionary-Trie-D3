import React, { Component, ReactSVGElement } from 'react';
import * as D3 from 'd3';
import countryJSON from '../../../assets/country.json';
import gdpJSON from '../../../assets/gdp.json';
import Navbar from '../../Navbar/Navbar';
import './GDP.scss';

class GDPSvg extends Component<{}> {
  myRef: React.RefObject<SVGSVGElement>;
  constructor(props: {}) {
    super(props);
    this.myRef = React.createRef<SVGSVGElement>();
  }
  componentDidMount = () => {
    if (!this.myRef.current) return;
    const countryInfo = new Map();
    gdpJSON.forEach(element => {
      if (element.value) {
        countryInfo.set(element.country.id, { gdp: element.value });
      }
    });
    let countryCategories = new Map();
    countryCategories.set('Latin America & Caribbean ', 1);
    countryCategories.set('South Asia', 2);
    countryCategories.set('Sub-Saharan Africa ', 3);
    countryCategories.set('Europe & Central Asia', 4);
    countryCategories.set('Aggregates', 5);
    countryCategories.set('Middle East & North Africa', 6);
    countryCategories.set('East Asia & Pacific', 7);
    countryCategories.set('North America', 8);

    countryJSON.forEach(element => {
      let countryObj = countryInfo.get(element.iso2Code);
      if (countryObj) {
        countryObj.id = element.name;
        countryObj.cluster = countryCategories.get(element.region.value);
        countryObj.region = element.region.value;
        countryInfo.set(element.iso2Code, countryObj);
      }
    });

    const arrayOfCountries: any[] = [];
    countryInfo.forEach(value => {
      arrayOfCountries.push(value);
    });

    let filteredCountries = arrayOfCountries.filter(element => {
      return element.cluster != 5;
    });

    console.log(filteredCountries);

    let d3Graph = D3.select(this.myRef.current);
    let width = this.myRef.current.width.baseVal.value;
    let height = this.myRef.current.height.baseVal.value;

    const simulation = D3.forceSimulation(filteredCountries)
      .force('charge', D3.forceManyBody().strength(1))
      .force('center', D3.forceCenter(width / 2, height / 2))
      .force(
        'collide',
        D3.forceCollide().radius((d: any) => {
          return Math.cbrt(d.gdp) / 300;
        })
      );

    let tooltip = D3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('background', ' #e6e6ff')
      .style('padding', '10px')
      .style('opacity', 0.9)
      .style('font-size', '30px')
      .style('color', 'gray')
      .style('border-radius', '3px')
      .style('font-family', `'Courier New', Courier, monospace`);

    const drag = (simulation: any): any => {
      const dragstarted = (d: any) => {
        if (!D3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      };

      const dragged = (d: any) => {
        d.fx = D3.event.x;
        d.fy = D3.event.y;
      };

      const dragended = (d: any) => {
        if (!D3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      };

      return D3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    };
    let node = d3Graph
      .classed('forceNode', true)
      .append('g')
      .attr('stroke', '#f8f8ff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(filteredCountries)
      .join('circle')
      .attr('r', (d: any) => Math.cbrt(d.gdp) / 300)
      .style('fill', (d: any) => {
        switch (d.cluster) {
          case 1:
            return '#ff5959';
          case 2:
            return '#ff8859';
          case 3:
            return '#ffe059';
          case 4:
            return '#59ff9e';
          case 5:
            return '#59ffee';
          case 6:
            return '#59aeff';
          case 7:
            return '#7159ff';
          case 8:
            return '#db59ff';
          default:
            return 'black';
        }
      })
      .on('mouseover', function(d) {
        console.log(tooltip);
        return tooltip
          .style('visibility', 'visible')
          .text(`Country: ${d.id}, Region:${d.region} GDP: $${d.gdp}`);
      })
      .on('mousemove', function(d) {
        return tooltip
          .style('top', height * 0.5 + 'px')
          .style('left', width * 0.75 + 'px');
      })
      .on('mouseout', function() {
        return tooltip.style('visibility', 'hidden');
      })
      .call(drag(simulation));

    simulation.on('tick', () => {
      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
    });
  };

  render() {
    return (
      <div className="gdp">
        <Navbar />
        <div className="gdptext">
          <p>
            This graph represents the GDP and regions of a country. This is type
            of graph is known as the force clustered layout. The main advantages
            are good-quality results, it's flexibility, intuitive simplicity,
            interactivity, and strong theoretical foundations.
          </p>
        </div>
        <svg ref={this.myRef} width="100vw" height="85vh" />
      </div>
    );
  }
}

export default GDPSvg;
