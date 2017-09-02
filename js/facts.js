(function() {
    var facts = [
        {
            fact: "the average cost of a wedding in Viola, IL",
            amount: 26643,
            source: 'https://www.costofwedding.com/index.cfm/action/search.weddingcost/zipcode/61486/'
        },
        {
            fact: "the average cost of a wedding in Elizabeth, IL",
            amount: 27407,
            source: 'https://www.costofwedding.com/index.cfm/action/search.weddingcost?zipcode=61028'
        },
        {
            fact: "the average cost of a wedding in Rockford, IL",
            amount: 30399,
            source: 'https://www.costofwedding.com/index.cfm/action/search.weddingcost?zipcode=61107'
        },
        {
            fact: "the average cost of a wedding in Magnolia, IL",
            amount: 34641,
            source: 'https://www.costofwedding.com/index.cfm/action/search.weddingcost?zipcode=61336'
        },
        {
            fact: "the average cost of building a new home in Naperville, IL",
            amount: 66225,
            source: 'https://www.manta.com/cost-new-home-builders-naperville-il'
        },
        {
            fact: "the average cost of building a new home in Springfield, IL",
            amount: 56705,
            source: 'https://www.manta.com/cost-new-home-builders-springfield-il'
        },
        {
            fact: "the average cost of building a new home in Rockford, IL",
            amount: 62272,
            source: 'https://www.manta.com/cost-new-home-builders-rockford-il'
        },
        {
            fact: "the average cost of year of tuition, room & board at Western Illinois University",
            amount: 15577,
            source: 'https://financialaid.illinoisstate.edu/paying/cost/table-group-1.php'
        },
        {
            fact: "the average cost of year of tuition, room & board at Southern Illinois University - Edwardsville",
            amount: 2097,
            source: 'https://www.siue.edu/paying-for-college/tuition-and-fees/undergraduate/index.shtml'
        },
        {
            fact: "the average cost of daycare in a non-urban area of Illinois",
            amount: 11800,
            source: 'http://rockrivertimes.com/2011/09/14/illinois-eighth-least-affordable-for-daycare/'
        },
        {
            fact: "the average cost of daycare in an urban area of Illinois",
            amount: 12100,
            source: 'http://rockrivertimes.com/2011/09/14/illinois-eighth-least-affordable-for-daycare/'
        },
        {
            fact: "the average cost to purchase a gas station in Owego, IL",
            amount: 395000,
            source: 'https://www.bizbuysell.com/illinois/owego/gas-stations-for-sale/?q=/wEFDmlyPTEmbj0mc3BpZD00'
        },
        {
            fact: "the average cost to purchase a gas station in Rockford, IL",
            amount: 399000,
            source: 'https://www.bizbuysell.com/illinois/rockford/gas-stations-for-sale/?q=/wEFD2lyPTEmbj1hJnNwaWQ9NA=='
        },
        {
            fact: "the average cost to purchase a gas station in Cook County",
            amount: 750000,
            source: 'https://www.bizbuysell.com/illinois/gas-stations-for-sale/?q=/wEFHWlyPTEmaz1Db29rK0NvdW50eSZuPWEmc3BpZD00'
        },
        {
            fact: "the average annual cost of car insurance in Illinois",
            amount: 1370,
            source: 'https://www.valuepenguin.com/average-cost-of-insurance'
        },
        {
            fact: "the average annual salary of a healthcare practitioner/technician in Clinton County, IL",
            amount: 61680,
            source: 'http://livingwage.mit.edu/counties/17027'
        },
        {
            fact: "the average annual salary of a community/social worker in Clinton County, IL",
            amount: 42100,
            source: 'http://livingwage.mit.edu/counties/17027'
        },
        {
            fact: "the average annual salary of a teacher/librarian/educator in Clinton County, IL",
            amount: 48950,
            source: 'http://livingwage.mit.edu/counties/17027'
        },
        {
            fact: "the average annual salary of a construction/infrastructure worker in Clinton County, IL",
            amount: 61160,
            source: 'http://livingwage.mit.edu/counties/17027'
        },
        {
            fact: "the average annual salary of a community/social worker in Kankakee County, IL",
            amount: 44130,
            source: 'http://livingwage.mit.edu/counties/17091'
        },
        {
            fact: "the average annual salary of a teacher/librarian/educator in Kankakee County, IL",
            amount: 41110,
            source: 'http://livingwage.mit.edu/counties/17091'
        },
        {
            fact: "the average annual salary of a healthcare practitioner/technician in Kankakee County, IL",
            amount: 55080,
            source: 'http://livingwage.mit.edu/counties/17091'
        },
        {
            fact: "the average annual salary of a construction/infrastructure worker in Kankakee County, IL",
            amount: 54390,
            source: 'http://livingwage.mit.edu/counties/17091'
        },
        {
            fact: "the average annual salary of a healthcare practitioner/technician in Decatur County, IL",
            amount: 48700,
            source: 'http://livingwage.mit.edu/metros/19500'
        },
        {
            fact: "the average annual salary of a teacher/librarian/educator in Decatur County, IL",
            amount: 41710,
            source: 'http://livingwage.mit.edu/metros/19500'
        },
        {
            fact: "the average annual salary of an architect/engineer in Decatur County, IL",
            amount: 59620,
            source: 'http://livingwage.mit.edu/metros/19500'
        },
        {
            fact: "the average annual salary of a construction/infrastructure worker in Decatur County, IL",
            amount: 44380,
            source: 'http://livingwage.mit.edu/metros/19500'
        },
        {
            fact: "the average cost of a home in Naperville, IL",
            amount: 38100,
            source: 'https://www.zillow.com/naperville-il/home-values/'
        },
        {
            fact: "the average cost of a home in Danville, IL",
            amount: 66800,
            source: 'https://www.forbes.com/forbes/welcome/?toURL=https://www.forbes.com/places/il/danville/'
        },
        {
            fact: "the average cost of a home in Springfield, IL",
            amount: 105700,
            source: 'https://www.zillow.com/springfield-il/home-values/'
        },
        {
            fact: "the average household income of Danville, IL",
            amount: 42706,
            source: 'https://www.forbes.com/forbes/welcome/?toURL=https://www.forbes.com/places/il/danville/'
        },
        {
            fact: "the average household income of Harvard, IL",
            amount: 51732,
            source: 'http://www.bestplaces.net/economy/zip-code/illinois/harvard/60033'
        },
        {
            fact: "the average household income of Fox Lake, IL",
            amount: 56208,
            source: 'http://www.towncharts.com/Illinois/Economy/Fox-Lake-village-IL-Economy-data.html'
        },
        {
            fact: "the monthly cost of living for a family of four in Schaumburg, IL",
            amount: 4700,
            source: 'https://www.paysa.com/cost-of-living/schaumburg,-il--l'
        },
        {
            fact: "the monthly cost of living for a family of four in Evanston, IL",
            amount: 5100,
            source: 'https://www.paysa.com/cost-of-living/evanston,-il--l'
        },
        {
            fact: "the monthly cost of living for a family of four in Skokie, IL",
            amount: 4900,
            source: 'https://www.paysa.com/cost-of-living/skokie,-il--l'
        },
        {
            fact: "the monthly cost of assisted living in Illinois",
            amount: 4050,
            source: 'https://www.seniorhomes.com/s/illinois/assisted-living/'
        },
        {
            fact: "the average annual salary of a Correctional Officer in Arlington Heights, IL",
            amount: 44173,
            source: 'http://www1.salary.com/IL/Correctional-Officer-salary.html'
        },
        {
            fact: "the average annual salary of a Correctional Officer in Normal, IL",
            amount: 40969,
            source: 'http://www1.salary.com/IL/Correctional-Officer-salary.html'
        },
        {
            fact: "the average annual salary of a Correctional Officer in Rock Island, IL",
            amount: 39474,
            source: 'http://www1.salary.com/IL/Correctional-Officer-salary.html'
        },
        {
            fact: "the annual membership fees for the Dan Kinney Family Center in Springfield, IL",
            amount: 420,
            source: 'http://parkboard.org/164/Member-Info'
        },
        {
          fact: "the annual cost of trash removal in Cook County, IL",
          amount: 144,
          source: 'https://www.cityofchicago.org/city/en/depts/fin/provdrs/city-of-chicago-garbage-fee-webpage.html'
        },
        {
          fact: "the cost of a new CTA bus in 2015",
          amount: 548000,
          source: 'http://www.chicagotribune.com/news/local/breaking/ct-cta-nova-buses-met-20150810-story.html'
        },
        {
          fact:
            "the annual cost of street maintenance for a single Chicago aldermanic ward",
          amount: 1300000,
          source: 'http://www.chicagotribune.com/news/local/politics/ct-rahm-emanuel-menu-money-0422-20170421-story.html'
        },
        {
          fact: "the annual salary of an animal control worker in Illinois",
          amount: 36000,
          source: 'https://www.indeed.com/salaries/Animal-Control-Officer-Salaries,-Illinois'
        }
    ]

    window.Facts = facts;
})();
