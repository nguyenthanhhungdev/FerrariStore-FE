import { all, call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  getBooksAction,
  getBooksSuccessAction,
  getBooksFailureAction,
} from "./bookSlice.ts";
import { Book } from "../../models/Book.ts";

/* 

function* fetchBooksSaga() { ... }: Đây là một hàm generator, được định nghĩa bằng từ khóa function*. Hàm này sẽ trả về một đối tượng iterator và có thể tạm dừng và tiếp tục thực thi tại các điểm yield.

try { ... } catch (error) { ... }: Khối try-catch được sử dụng để xử lý các lỗi có thể xảy ra

yield call(axios.get, API_URL): Hàm call() được sử dụng để gọi một hàm không đồng bộ. Trong trường hợp này, chúng ta gọi hàm axios.get() để thực hiện một HTTP GET request đến API_URL.

*/

function* fetchBooksSaga() {
  const API_URL: string = import.meta.env.VITE_API_URL2;
  try {
    // Gọi API để lấy dữ liệu sách
    const response: AxiosResponse<Book[]> = yield axios.get(`${API_URL}/books`);
    console.log("fetchBooksSaga Data");
    console.log(response.data);
    // Nếu thành công, dispatch action getBooksSuccess với dữ liệu nhận được
    yield put(getBooksSuccessAction(response.data));
  } catch (error: unknown) {
    // Nếu có lỗi, dispatch action getBooksFailure với thông báo lỗi
    yield put(getBooksFailureAction((error as Error).message));
  }
}

export function* watchFetchBookData() {
  // Lắng nghe action getBooksAction và gọi hàm fetchBooksSaga khi action được dispatch
  yield takeLatest(getBooksAction.type, fetchBooksSaga);
}

export default function* bookSaga(): Generator<unknown, void, unknown> {
  yield all([call(watchFetchBookData)]);
}
