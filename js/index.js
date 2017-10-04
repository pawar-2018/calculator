/*
## NEXT STEPS:
- Add "How many days of campaigning would pay off state debt?" at page load
- Add donation duration calculator

## CURRENTLY:
- App is storing all candidates expenditures
- CPS budget is pretty high and doesn't make for a good data point. Maybe for all candidates instead?

## TODO:
- Only make Ruaner API call for this app - move other calls to new pen/app
*/

(function(facts) {
    'use strict';

    var App = {
        apiEndPoint: 'https://expenditures.pawarapis.com/candidate/CANDIDATEID',
        candidates: [
            {
                id: 'rauner',
                name: 'Bruce Rauner',
                party: 'r',
                committeeId: '25185'
            },
            {
                id: 'biss',
                name: 'Daniel Biss',
                party: 'd',
                committeeId: '23971'
            },
            {
                id: 'daiber',
                name: 'Bob Daiber',
                party: 'd',
                committeeId: '32591'
            },
            {
                id: 'drury',
                name: 'Scott Drury',
                party: 'd',
                committeeId: '23682'
            },
            {
                id: 'hardiman',
                name: 'Tio Hardiman',
                party: 'd',
                committeeId: ''
            },
            {
                id: 'kennedy',
                name: 'Chris Kennedy',
                party: 'd',
                committeeId: '32590'
            },
            {
                id: 'paterakis',
                name: 'Alex Paterakis',
                party: 'd',
                committeeId: '32289'
            },
            {
                id: 'pawar',
                name: 'Ameya Pawar',
                party: 'd',
                committeeId: '32469'
            },
            {
                id: 'biss',
                name: 'Daniel Biss',
                party: 'd',
                committeeId: '23971'
            },
            {
                id: 'pritzker',
                name: 'J.B. Pritzker',
                party: 'd',
                committeeId: '32762'
            }
        ],
        defaultExpenditures: {
            expendituresCount: 0,
            firstExpenditure: null,
            spendingDays: 0,
            spentPerDay: 0,
            spentPerSecond: 0,
            timestamp: null,
            total: 0
        },
        storageDuration: 60 * 60 * 1000 * 2, // 2hrs (mins x secs x ms x hrs)
        elements: {
            amount: document.getElementById('amount'),
            calculate: document.getElementById('calculate'),
            perSecondCounter: document.getElementById('per-second-counter'),
            results: document.getElementById('results'),
            spentTime: document.getElementById('spent-time'),
            spentToday: document.getElementById('spent-today'),
            daysToCPSBudget: document.getElementById('days-to-cps-budget'),
            random: document.getElementById('random-fact'),
            randomPhrase: document.getElementById('random-phrase'),
            randomAmount: document.getElementById('random-amount'),
            randomTime: document.getElementById('random-time'),
            randomSpend: document.getElementById('random-spend'),
            randomLink: document.getElementById('random-link'),
            randomSource: document.getElementById('random-source')
            //donationAmount: document.getElementById('donation-amount'),
            //calculateDonation: document.getElementById('calculate-donation')
        }
    };

    // loaded from external file
    App.facts = facts;

    App.formatSeconds = function(d) {
        d = Number(d);
        var D = Math.floor(d / 86400);
        var h = Math.floor(D ? (d - (86400 * D)) / 3600 : d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var DDisplay = D > 0 ? D + (D == 1 ? ' day' : ' days') : '';
        var hDisplay = h > 0 ? h + (h == 1 ? ' hour' : ' hours') : '';
        var mDisplay = m > 0 ? m + (m == 1 ? ' minute' : ' minutes') : '';
        var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';

        var final = hDisplay;

        if(DDisplay) {
            final = DDisplay + ', ' + final;
        }

        if (mDisplay !== '') {
            final += (hDisplay !== '' ? ', ' : '') + mDisplay;
        }

        if (sDisplay !== '') {
            final += (mDisplay !== '' ? ', and ' : '') + sDisplay;
        }

        return final;
    };

    App.displaySalaryResults = function(total, perSecond) {
        var secondsToSpend = Math.round(App.elements.amount.value / perSecond);

        App.elements.spentTime.textContent = App.formatSeconds(secondsToSpend);
        App.elements.results.classList.add('reveal');
    };

    App.displayRandomResults = function(phrase, amount, source, perSecond) {
        var secondsToSpend = Math.round(amount / perSecond);

        App.elements.randomPhrase.textContent = phrase;
        App.elements.randomLink.setAttribute('href', source);
        App.elements.randomAmount.textContent = Number(amount).toLocaleString();
        App.elements.randomTime.textContent = App.formatSeconds(secondsToSpend);
        App.elements.randomSpend.classList.add("reveal");
        App.elements.randomSource.classList.add("reveal");
    };

    App.displayRaunerPerSecondCounter = function(perSecond) {
        var today = new Date();
        var secondsToday = (((today.getHours() * 60) + today.getMinutes()) * 60) + today.getSeconds();
        secondsToday = Math.round(secondsToday);

        var total = (secondsToday * perSecond).toFixed(2);
        var totalPieces = total.toString().split('.');

        var dollars = totalPieces[0];
        var cents = totalPieces[1];

        if (cents.length === 0) {
            cents = '00';
        } else if (cents.length === 1) {
            cents += '0';
        }

        App.elements.spentToday.textContent = Number(dollars).toLocaleString() + '.' + cents;

        App.elements.perSecondCounter.classList.add('reveal');

        setTimeout(function() {
            App.displayRaunerPerSecondCounter(perSecond);
        }, 1000);
    };

    App.getCandidateData = function(candidate) {
        // pack your bags, we're going to the API endpoint
        var xhr = new XMLHttpRequest();

        // for some reason, Firefox can't see CORS headers without this conditional
        if (xhr.withCredentials !== undefined) {
            xhr.open('GET', App.apiEndPoint.replace('CANDIDATEID', candidate.id), true);

            xhr.onload = function() {
                var dataFound = false;

                // make sure we have a valid response
                if (xhr.status >= 200 && xhr.status < 400) {
                    // turn it in to an object
                    var data = JSON.parse(xhr.responseText);

                    // make sure we got some data
                    if (data.timestamp) {
                        dataFound = true;

                        // put the data in App.apiData
                        App.populateCandidate(candidate, data);

                        // put the data in localStorage
                        App.storeCandidateData(candidate, data);
                    }
                }

                // if no expenditure data could be found, default to 0 spending
                if (!dataFound) {
                    App.storeCandidateData(candidate, App.defaultExpenditures);
                }
            }

            xhr.send();
        }
    };

    // returns candidate data from localStorage if
    //  a) it exists, and
    //  b) it hasn't expired
    App.checkLocalStorage = function(candidate) {
        var obj = localStorage.getItem(candidate.id);

        if (obj) {
            obj = JSON.parse(obj);

            // make sure data hasn't expired
            if ((new Date().getTime() - obj.timestamp) >= App.storageDuration) {
                obj = null;
            } else {
                // remove the timestamp
                delete obj.timestamp;
            }
        }

        return obj || null;
    };

    // update given candidate in App.candidates with data from localStorage or API
    App.populateCandidate = function(candidate, candidateData) {
        // remove timestamp if present (from localStorage)
        if (candidateData.hasOwnProperty('timestamp')) {
            delete candidateData.timestamp;
        }

        for (var i = 0; i < App.candidates.length; i++) {
            if (App.candidates[i].id === candidate.id) {
                App.candidates[i].data = candidateData;

                // show default data for each candidate
                App.initialDataDisplayer(candidate);

                break;
            }
        }
    };

    // puts candidate data in localStorage for quick repeat page loads
    App.storeCandidateData = function(candidate, candidateData) {
        // add a timestamp for cache invalidation
        candidateData.timestamp = new Date().getTime();

        localStorage.setItem(candidate.id, JSON.stringify(candidateData));
    };

    // loads data into App.apiData via either localStorage or API request
    App.loadCandidateData = function(candidate) {
        var data = App.checkLocalStorage(candidate);

        if (data) {
            App.populateCandidate(candidate, data);
        } else {
            App.getCandidateData(candidate);
        }
    };

    // displays different info from different candidates as they load
    App.initialDataDisplayer = function(candidate) {
        switch (candidate.id) {
            case 'rauner':
                App.displayRaunerPerSecondCounter(candidate.data.spentPerSecond);
                App.displayRaunerFact();
                break;
        }
    };

    App.displayRaunerFact = function(e) {
        if (e) { 
            e.preventDefault();
        }

        var randomNum = function() {
            return Math.floor(Math.random() * App.facts.length);
        };

        var rauner = App.candidates.filter(function(candidate) {
            return candidate.id === "rauner";
        });
        var randomFact = App.facts[randomNum()];

        App.displayRandomResults(randomFact.fact, randomFact.amount, randomFact.source, rauner[0].data.spentPerSecond);
    }

    // wire up the buttons
    App.elements.calculate.addEventListener('click', function(e) {
        e.preventDefault();

        var rauner = App.candidates.filter(function(candidate) {
            return candidate.id === 'rauner';
        });

        App.displaySalaryResults(rauner[0].data.total, rauner[0].data.spentPerSecond);
    });

    App.elements.random.addEventListener('click', App.displayRaunerFact);

    /*
    App.elements.calculateDonation.addEventListener('click', function(e) {
        e.preventDefault();

        App.displayDonationResults(App.apiData);
    });
    */

    // all things that should happen at page load
    App.init = function() {
        // only need rauner data for now
        App.candidates.forEach(function(candidate) {
            if (candidate.id === 'rauner') {
                App.loadCandidateData(candidate);

                return;
            }
        });
    };

    // run it!
    App.init();
})(window.Facts);
