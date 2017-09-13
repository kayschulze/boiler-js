import { Pandemic } from './../js/pandemic.js';
import {City} from './../js/city.js';

let city = new City("Seattle", ["Tacoma", "Bellingham", "Bellevue", "Everett", "Bremerton"]);
let pandemic = new Pandemic();

describe('City', function() {
  beforeEach(function() {
    city.infections = 0;
    city.maxed = false;
    city.quarantine = false;
    pandemic.createCities();
  });

  it('should add infection every time the function is called', function() {
    city.addInfection();
    expect(city.infections).toEqual(1);
  });

  it('should remove infection when remove function is called', function() {
    city.addInfection();
    city.removeInfection();
    expect(city.infections).toEqual(0);
  });

  it('should not remove infection if there are no infections to remove', function() {
    city.removeInfection();
    expect(city.infections).toEqual(0);
  });

  it('should change outbroken to false from true when used', function() {
    city.outbroken = true;
    city.removeInfection();
    expect(city.outbroken).toEqual(false);
  });

  it('should set maxed equal to true if infections are greater than 4', function() {
    city.infections = 4;
    city.addInfection();
    expect(city.maxed).toEqual(true);
  });

  it('should quarantine city when function is called', function() {
    city.quarantineCity();
    expect(city.quarantine).toEqual(true);
  });

});

describe('Pandemic', function() {
  beforeEach(function() {
    pandemic.cities = [];
    pandemic.infectionAmount = 4;
    pandemic.createCities();
  });

  it('should create 14 cities when createCities is called', function() {
    expect(pandemic.cities.length).toEqual(14);
  });

  it('should return the proper amount of total infections on the board', function() {
    pandemic.cities[0].addInfection();
    pandemic.cities[1].addInfection();
    pandemic.cities[2].addInfection();
    pandemic.cities[4].addInfection();
    pandemic.cities[6].addInfection();

    expect(pandemic.getTotalInfections()).toEqual(5);
  });

  it('should infect the proper amount of random cities', function() {
    pandemic.infectRandomCities(4);
    let result = pandemic.getTotalInfections();
    expect(result).toEqual(4);
  });

  it('should cause outbreak when a city is maxed above 4 infections', function() {
    //Infect Seattle, which is pandemic[0], and cause outbreak in Tacoma, Bellingham, Bellevue, Everett, and Bremerton.
    pandemic.cities[0].infections = 5;
    pandemic.cities[0].maxed = true;
    if (pandemic.cities[0].addInfection()) {
      pandemic.outbreak(pandemic.cities[0]);
    };
    expect(pandemic.getTotalInfections()).toEqual(10);
  });

  it('should cause a city to be outbroken if it gets an outbreak', function() {
    //Infect Seattle, which is pandemic[0], and cause outbreak in Tacoma, Bellingham, Bellevue, Everett, and Bremerton.
    pandemic.cities[0].infections = 5;
    pandemic.cities[0].maxed = true;
    if (pandemic.cities[0].addInfection()) {
      pandemic.outbreak(pandemic.cities[0]);
    };
    expect(pandemic.cities[0].outbroken).toEqual(true);
    expect(pandemic.getTotalInfections()).toEqual(10);
  });

  it('should cause multiple outbreaks when a city is maxed above 4 infections and it outbreaks to another maxed city', function() {
    //Infect Seattle, which is pandemic[0], and cause outbreak in Tacoma, Bellingham, Bellevue, Everett, and Bremerton.
    pandemic.cities[0].infections = 5;
    pandemic.cities[0].maxed = true;
    pandemic.cities[13].infections = 5;
    pandemic.cities[13].maxed = true;
    if (pandemic.cities[0].addInfection()) {
      pandemic.outbreak(pandemic.cities[0]);
    };
    expect(pandemic.getTotalInfections()).toEqual(16);
  });
});
