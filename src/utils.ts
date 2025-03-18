export const parseExchangeRates = (text: string) => {
    const lines = text
        .trim()
        .split('\n')
        .filter((line) => line.trim());

    const dataLines: string[] = [];
    let parsingData = false;

    for (const line of lines) {
        if (line.includes('|')) {
            parsingData = true;
            dataLines.push(line);
        } else if (parsingData) {
            dataLines.push(line);
        }
    }

    const headers = dataLines
        .shift()
        ?.split('|')
        .map((header) => header.trim());

    if (!headers) {
        throw new Error('No headers found in the data');
    }

    return dataLines.reduce(
        (acc, line) => {
            const values = line.split('|').map((value) => value.trim());
            const obj: { [key: string]: any } = {};

            headers.forEach((header, index) => {
                const value = values[index];
                const sanitizedHeader = header.toLowerCase();

                switch (sanitizedHeader) {
                    case 'amount':
                        obj[sanitizedHeader] = parseInt(value);
                        break;
                    case 'rate':
                        obj[sanitizedHeader] = parseFloat(value);
                        break;
                    default:
                        obj[sanitizedHeader] = value;
                }
            });

            const code = obj['code'];
            if (code) {
                acc[code] = obj;
            }

            return acc;
        },
        {} as { [key: string]: any }
    );
};
