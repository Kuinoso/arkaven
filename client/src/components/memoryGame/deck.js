function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;
};


export default function initializeDeck() {
    let id = 0;
    const cards = ['st', 'ln', 'gr', 'tr', 'br', 'ty']
        .reduce((acc, type) => {
            acc.push({
                id: id++,
                type,
            });

            acc.push({
                id: id++,
                type,
            });

            return acc;

        }, []);

    return shuffle(cards);
};