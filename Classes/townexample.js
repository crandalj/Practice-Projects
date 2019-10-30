class Street {
    constructor(name, yearBuilt, streetLength){
        this.name = name;
        this.yearBuilt = parseInt(yearBuilt);
        this.streetLength = parseInt(streetLength);
    }

    calcSize (){
        if(this.streetLength > 999){
            return 'huge';
        } else if (this.streetLength > 499){
            return 'big';
        } else if (this.streetLength > 249){
            return 'normal';
        } else if (this.streetLength > 99){
            return 'small';
        } else if (this.streetLength > 49){
            return 'tiny';
        }
        return 'normal';
    }
}

class Park {
    constructor(name, yearBuilt, area, trees){
        this.name = name;
        this.yearBuilt = parseInt(yearBuilt);
        this.area = parseInt(area);
        this.trees = parseInt(trees);
    }

    calcAge = () => { 
        let date = new Date;
        return date.getFullYear() - this.yearBuilt; 
    };
    calcDensity = () => { return this.trees/this.area };
}

class Town {
    constructor(){
        this.streets = [];
        this.parks = [];
    }
    // Adding to town
    addPark = (name, yearBuilt, area, trees) => { this.parks.push(new Park(name, yearBuilt, area, trees)) };
    addStreet = (name, yearBuilt, streetLength) => { this.streets.push(new Street(name, yearBuilt, streetLength)) };
    
    // Analyzing town
    calcAverageParkAge(){
        let average = 0;
        if(this.parks.length > 0){
            let sum = 0;
            this.parks.forEach(function(park){
                sum += park.calcAge();
            });
            average = sum / this.parks.length;
        }
        return average;
    }

    calcTotalStreetLength(){
        let sum = 0;
        if(this.streets.length > 0){
            this.streets.forEach(function (street) {
                sum += street.streetLength;
            });
        }
        return sum;
    }

    calcAverageStreetLength = () => { return this.calcTotalStreetLength()/this.streets.length };

    // Reports of town
    generateParkReport(){
        let parkReport = [];
        let thousandTreeParks = '';

        parkReport.push('----PARKS REPORT----');

        parkReport.push(`Our ${this.parks.length} parks have an average age of ${this.calcAverageParkAge()} years.`);

        this.parks.forEach(function (park) {
            if (park.trees >= 1000 && thousandTreeParks == '') {
                thousandTreeParks += park.name;
            } else if (park.trees >= 1000) {
                thousandTreeParks += `, ${park.name}`;
            }
            parkReport.push(`${park.name} has a tree density of ${park.calcDensity()} trees per square km`);
        });

        parkReport.push(`${thousandTreeParks} have more than 1,000 trees.`);
        
        return parkReport;
    }

    generateStreetReport(){
        let streetReport = [];
        streetReport.push('----STREETS REPORT----');

        streetReport.push(`Our ${this.streets.length} streets have a total length of ${this.calcTotalStreetLength()} km, with an average of ${this.calcAverageStreetLength()} km.`);

        this.streets.forEach(function(street){
            streetReport.push(`${street.name}, built in ${street.yearBuilt}, is a ${street.calcSize()} street.`);
        });

        return streetReport;
    }

    generateAnnualReport(){
        // Generate Parks report
        let parkReport = this.generateParkReport();

        // Generate Streets report
        let streetReport = this.generateStreetReport();

        // Output report
        parkReport.forEach(line => console.log(line));
        streetReport.forEach(line => console.log(line));
    }
}

// Init
let town = new Town();
// Parks
town.addPark('Spruce Grove Park', 1964, 53, 124);
town.addPark('Four Seasons Park', 1858, 532, 1250);
town.addPark('Mill Run Park', 1985, 23, 50);
// Streets
town.addStreet('Main Street', 1802, 1000);
town.addStreet('Washington Street', 1899, 450);
town.addStreet('Home Avenue', 2002, 213);
town.addStreet('Fairview Street', 1947, 752);

town.generateAnnualReport();