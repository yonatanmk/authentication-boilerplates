import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import Layout from './Layout';

const LandingPage = observer(({ sampleStore: { counter, increment } }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      increment()
    }, 1000);
    return () => {
      clearInterval(interval)
    }
  }, [increment])

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
});


// const LandingPage = observer(class App extends Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       interval: null,
//     };
//   }

//   componentDidMount() {
//     const { sampleStore: { increment } } = this.props;
//     const interval = setInterval(increment, 1000);
//     this.setState({ interval })
//   }

//   componentWillUnmount() {
//     const { interval } = this.state;
//     if (interval) {
//       clearInterval(interval)
//     }
//   }

//   render () {
//     const { sampleStore: { counter } } = this.props;
//     return (
//       <Layout>
//         <div className="col-md-6 offset-md-3 text-center">
//           <h1 className="p-5">MERN Stack Authentication Boilerplate</h1>
//           <hr />
//           <p className="lead">
//             MERN stack login registration system with email account activation, forgot password, reset password, login
//             with facebook and google, and private and protected routes for authenticated users and admin users.
//           </p>
//           <p>Mobx Counter: {counter}</p>
//         </div>
//       </Layout>
//     );
//   }
// });

export default
inject('sampleStore')(LandingPage);