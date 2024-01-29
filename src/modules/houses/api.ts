const URL = 'https://data.ssb.no/api/v0/no/table/07241?lang=en'

type RequestBodyDynamicValues = {
  houseType: string,
  selectedRange: Array<string>,
}

const getRequestBody = ({ houseType, selectedRange }: RequestBodyDynamicValues) => {
  return {
    query: [
      {
        code: "Boligtype",
        selection: {
          filter: "item",
          values: [
            houseType
          ]
        }
      },
      {
        code: "ContentsCode",
        selection: {
          filter: "item",
          values: [
            "KvPris"
          ]
        }
      },
      {
        code: "Tid",
        selection: {
          filter: "item",
          values: [
            ...selectedRange,
          ]
        }
      }
    ],
    response: {
      format: "json-stat2"
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchPrices = async ({houseType = "00", selectedRange = []}): Promise<any> => {
  try {
    const response = await fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(getRequestBody({ houseType, selectedRange })),
    });

    const data = await response.json()

    if (response.ok) {
      return Promise.resolve(data)
    }

    return Promise.reject(new Error('Fetching prices error'))
  } catch (e) {
    console.error(e)

    return Promise.reject(e)
  }
}

export {
  fetchPrices,
}
