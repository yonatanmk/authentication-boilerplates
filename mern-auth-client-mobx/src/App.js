import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Layout from 'core/Layout';

const App = observer( class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
          interval: null,
        };
      }

    componentDidMount() {
        const { sampleStore: { increment } } = this.props;
        const interval = setInterval(increment, 1000);
        this.setState({ interval })
    }

    componentWillUnmount() {
        const { interval } = this.state;
        if (interval) {
            clearInterval(interval)
        }
    }

    render () {
        const { sampleStore: { counter } } = this.props;
        return (
            <Layout>
                <div className="col-md-6 offset-md-3 text-center">
                    <h1 className="p-5">MERN Stack Authentication Boilerplate</h1>
                    <hr />
                    <p className="lead">
                        MERN stack login registration system with email account activation, forgot password, reset password, login
                        with facebook and google, and private and protected routes for authenticated users and admin users.
                    </p>
                    <p>Mobx Counter: {counter}</p>
                </div>
            </Layout>
        );
    }
});

export default
inject('sampleStore')(App);

// import React from 'react';
// import Layout from './core/Layout';

// const App = () => {
//     return (
//         <Layout>
//             <div className="col-md-6 offset-md-3 text-center">
//                 <h1 className="p-5">MERN Stack Authentication Boilerplate</h1>
//                 <hr />
//                 <p className="lead">
//                     MERN stack login registration system with email account activation, forgot password, reset password, login
//                     with facebook and google, and private and protected routes for authenticated users and admin users.
//                 </p>
//                 {/* <h4 className="p2">Bonus</h4>
//                 <p className="lead">Profile update & deployment to digital ocean cloud servers</p> */}
//             </div>
//         </Layout>
//     );
// };

// export default App;
