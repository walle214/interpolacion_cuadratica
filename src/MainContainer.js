import React, { Component } from 'react'
export default class MainContainer extends Component {
    render() {
        return (
            <div className="container my-4">
                <div className="row">
                    <Form />
                    <div className='col-7' id='grafica'></div>
                </div>
            </div>
        )
    }
}
class Form extends Component {
    loadChart = (values) => {
        // eslint-disable-next-line no-undef
        Highcharts.chart('grafica', {
            chart: {
                type: 'spline'
            },
            title: {
                text: `Interpolacion Cuadrática`
            },
            xAxis: {
                // eslint-disable-next-line
                categories: values.map(item => item.x)
            },
            yAxis: {
                title: {
                    text: 'Fx'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'X',
                // eslint-disable-next-line
                data: values.map(item => item.fx)
            }],
        });
        return 0;
    }
    calcX = _ => {
        const x = Number(prompt('Escribe la X a calcular'));
        const realValue = prompt('Escribe el valor real de fx', 'undefined');

        const valuesX = this.state.items.map(item => Number(item.xValue));
        const valuesFx = this.state.items.map(item => Number(item.fxValue));
        const values = valuesX.map((v, i) => {
            return {
                x: v,
                fx: valuesFx[i]
            }
        });
        // for(var i = 0; i<values.length; {

        // }
        values.sort((a, b) => a.x - b.x);
        const fx =
            ((x - valuesX[1]) * (x - valuesX[2])) / ((valuesX[0] - valuesX[1]) * (valuesX[0] - valuesX[2])) * (valuesFx[0]) +
            ((x - valuesX[0]) * (x - valuesX[2])) / ((valuesX[1] - valuesX[0]) * (valuesX[1] - valuesX[2])) * (valuesFx[1]) +
            ((x - valuesX[0]) * (x - valuesX[1])) / ((valuesX[2] - valuesX[0]) * (valuesX[2] - valuesX[1])) * (valuesFx[2]);
        const a = Number.isNaN(fx) ? 'No hay' : fx
        values.push({ x, a });


        values.sort((a, b) => a.x - b.x);
        let porcentaje = 'No definido';
        if (!realValue.isNaN) {
            porcentaje = ((realValue - fx) / realValue) * 100;
        }

        this.setState({
            aprox: fx.toFixed(6),
            error: `${porcentaje.toFixed(2)}%`,
        });


        this.loadChart(values);
    }
    handleChanceX = e =>
        this.setState({ textX: e.target.value });

    handleChanceFx = e =>
        this.setState({ textFx: e.target.value });

    handleSubmit = e => {
        e.preventDefault();
        if (!this.state.textX.length) return;
        if (!this.state.textFx.length) return;
        const newItem = {
            id: Date.now(),
            xValue: this.state.textX,
            fxValue: this.state.textFx,
            currentX: this.state.currentX
        }
        this.setState({
            items: this.state.items.concat(newItem),
            textFx: '',
            textX: '',
            currentX: this.state.currentX + 1
        });
        if (this.state.currentX === 2) {
            document.getElementById('aproximaciones').hidden = false;
            document.getElementById('form-data').hidden = true;
            document.getElementById('reset-all').hidden = false;
            setTimeout(this.calcX, 700);
        }
    }
    resetAll = e => {
        e.preventDefault();
        this.setState({
            currentX: 0,
            textFx: '',
            textX: '',
            items: [],
            error: 0,
            aprox: 0
        });
        document.getElementById('aproximaciones').hidden = true;
        document.getElementById('reset-all').hidden = true;
        document.getElementById('form-data').hidden = false;

    }
    constructor(props) {
        super(props);
        this.state = { items: [], textX: '', textFx: '', currentX: 0, aprox: 0, error: 0 };

        this.handleChanceX = this.handleChanceX.bind(this);
        this.handleChanceFx = this.handleChanceFx.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.resetAll = this.resetAll.bind(this);
    }
    render() {
        return (
            <div className="col-5">
                <ul className="list-group" id='aproximaciones' hidden>
                    <div className='mt-2 mb-4'>
                        <li className="list-group-item d-flex justify-content-between align-items-center" >
                            <div>Aproximacion</div>
                            <span className="badge badge-primary badge-pill">{this.state.aprox}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <div>Error Realitvo</div>
                            <span className="badge badge-primary badge-pill">{this.state.error}</span>
                        </li>
                    </div>
                </ul>
                <input onChange={() => { return }} hidden id='reset-all' className='btn btn-danger m-0' value='Reiniciar' onClick={this.resetAll} />
                <form onSubmit={this.handleSubmit} id='form-data'>
                    <div className="row mt-4">
                        <div className="col">
                            <label className='form-label'>Escribe X<sub>{this.state.currentX}</sub></label>
                            <input
                                type="text"
                                className="form-control"
                                id="x"
                                onChange={this.handleChanceX}
                                value={this.state.textX} />
                        </div>
                        <div className="col">
                            <label className='form-label'>Escribe Fx<sub>{this.state.currentX}</sub></label>
                            <input
                                type="text"
                                className="form-control"
                                id="fx"
                                onChange={this.handleChanceFx}
                                value={this.state.textFx} />
                        </div>
                        <input value='Guardar' type='submit' className='form-control btn btn-outline-primary m-3' />
                    </div>
                </form>
                <DataList items={this.state.items} />
            </div>
        )
    }
}
class DataList extends React.Component {
    render() {
        return (
            <ul className="list-group">
                {
                    this.props.items.map(
                        item => (
                            <div className='mt-2 mb-4' key={item.id}>
                                <li className="list-group-item d-flex justify-content-between align-items-center" >
                                    <div>X<sub>{item.currentX}</sub></div>
                                    <span className="badge badge-primary badge-pill">{item.xValue}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>Fx<sub>{item.currentX}</sub></div>
                                    <span className="badge badge-primary badge-pill">{item.fxValue}</span>
                                </li>
                            </div>
                        )
                    )
                }
            </ul>
        );
    }
}