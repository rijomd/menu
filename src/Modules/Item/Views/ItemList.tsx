import React from 'react'

type Props = {}

const ItemList = (props: Props) => {
    const comp = [
        { red: ["green", "yellow", "blue",] },
        { green: ["blue", "grey", "white"] },
        { blue: ["orange", "violet", "pink"] },
    ];
    const [colors, setColors] = React.useState<any>({ red: -1, green: -1, blue: -1 });
    const [intervalId, setIntervalId] = React.useState<any>(null);

    const play = () => {
        let id = setInterval(() => {
            for (let i in colors) {
                colors[i] = (colors[i] + 1) % 3;
            }
            setColors({ ...colors });
        }, 1000);
        setIntervalId(id);
    };

    return (
        <div className="App">
            {comp.map((item: any, index: number) => {
                const key = Object.keys(item)[0];
                const color = item[key];
                return (
                    <div key={index}
                        style={{
                            width: 50,
                            height: 50,
                            margin: 5,
                            background: color[colors[key]] || "black",
                        }}
                    >
                        Hello
                    </div>
                );
            })}
            <button onClick={play}><strong>OK</strong></button>
            <button onClick={() => {
                clearInterval(intervalId);
                setIntervalId(null);
            }}><b>cancel</b></button>
        </div>
    );
}

export default React.memo(ItemList);