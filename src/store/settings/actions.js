import { bind } from '../../libs/store/actions'
import Utils from 'src/libs/utils'
import axios from 'axios'

const save = (__, { id, body }) => {
  return (!id ? axios.post(Utils.makeURL('settings'), body) : axios.put(Utils.makeURL(`settings/${id}`, body)))
}

export {
  bind,
  save
}
