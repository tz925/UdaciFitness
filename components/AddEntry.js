import React, {Component} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString } from  '../utils/helpers'
import MySlider from './MySlider'
import MySteppers from './MySteppers'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'

// function SubmitBtn ({ onPress }) {
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <Text>SUBMIT</Text>
//     </TouchableOpacity>
//   )
// }


export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }
  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)
    this.setState((state) => {
      const count = state[metric] + step
      return {
        ...state,
        [metric]: count > max ? max : count
      }
    })
  }
  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step
      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      }
    })
  }
  slide = (metric, value) => {
    console.log(metric, value);
    this.setState(() => ({
      [metric]: value,
    }))
  }
  submit = () => {
    const key = timeToString()
    const entry = this.setState
    //Update Redux
    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }))
    //Navigate to home
    //Save to DB
    //clearn local notification
  }
  reset = () => {
    const key = timeToString()
    //update Redux
    //route to home
    //Update DB
  }


  render() {
    const metaInfo = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name='ios-happy-outline' size={100} />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    }

    return (
      <View>
        <DateHeader date={(new Date()).toLocaleDateString()} />
        <Text>{JSON.stringify(this.state)}</Text>
        {Object.keys(metaInfo).map(key => {
          const {getIcon, type, ...rest } = metaInfo[key]
          let value = this.state[key]
          return  (
            <View key={key}>
              {getIcon()}
              {type === 'slider'
               ? <MySlider
                   value={value}
                   onChange={(value) => this.slide(key, value)}
                   {...rest}
                 />
               : <MySteppers
                   value={value}
                   onIncrement={() => this.increment(key)}
                   onDecrement={() => this.decrement(key)}
                   {...rest}
                 />
               }
            </View>
          )
        })}
        <TextButton onPress={this.submit}>RESET</TextButton>
      </View>
    )
  }
}
