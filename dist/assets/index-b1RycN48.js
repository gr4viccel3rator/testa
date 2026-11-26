(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const r of c.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(i){if(i.ep)return;i.ep=!0;const c=s(i);fetch(i.href,c)}})();const se=[{id:"intro",label:"Mở đầu",range:[1,2],firstSlide:1,theme:"hero"},{id:"timsort",label:"Timsort",range:[3,7],firstSlide:3,theme:"timsort"},{id:"introsort",label:"Introsort",range:[8,13],firstSlide:8,theme:"introsort"},{id:"heapsort",label:"Heap Sort",range:[14,18],firstSlide:14,theme:"heapsort"},{id:"summary",label:"Tổng hợp",range:[19,19],firstSlide:19,theme:"summary"}],rt=[{id:"full",label:"Toàn bộ TimSortDemo.java",description:"Mã nguồn đầy đủ biến thể Timsort rút gọn phục vụ học tập (Java 8+, MIN_RUN = 4).",code:`import java.util.Arrays;

public class TimSortDemo {
    private static final int MIN_RUN = 4; // Minrun cố định để minh họa sư phạm

    public static void timSort(int[] a) {
        int n = a.length;
        if (n < 2) return;
        int[] runStart = new int[n];
        int[] runEnd = new int[n];
        int runCount = 0, start = 0;

        // 1. Phát hiện run tăng dần và mở rộng đến MIN_RUN
        while (start < n) {
            int naturalEnd = start + 1;
            while (naturalEnd < n && a[naturalEnd - 1] <= a[naturalEnd]) {
                naturalEnd++;
            }
            int end = Math.min(n, Math.max(naturalEnd, start + MIN_RUN));
            insertionSort(a, start, end - 1);
            runStart[runCount] = start;
            runEnd[runCount] = end - 1;
            runCount++;
            start = end;
        }

        // 2. Gộp các run kề nhau theo từng lượt
        while (runCount > 1) {
            int nextCount = 0;
            for (int i = 0; i < runCount; i += 2) {
                if (i + 1 < runCount) {
                    int left = runStart[i], mid = runEnd[i], right = runEnd[i + 1];
                    merge(a, left, mid, right);
                    runStart[nextCount] = left;
                    runEnd[nextCount] = right;
                } else {
                    runStart[nextCount] = runStart[i];
                    runEnd[nextCount] = runEnd[i];
                }
                nextCount++;
            }
            runCount = nextCount;
        }
    }

    private static void insertionSort(int[] a, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int key = a[i], j = i - 1;
            while (j >= left && a[j] > key) { // Dùng > thay vì >= để giữ tính ổn định (Stable)
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = key;
        }
    }

    private static void merge(int[] a, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;
        while (i <= mid && j <= right) {
            temp[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];
        }
        while (i <= mid) temp[k++] = a[i++];
        while (j <= right) temp[k++] = a[j++];
        System.arraycopy(temp, 0, a, left, temp.length);
    }

    public static void main(String[] args) {
        int[] input = {3, 5, 7, 2, 4, 6, 9, 1, 8, 10};
        System.out.println("Input : " + Arrays.toString(input));
        timSort(input);
        System.out.println("Output: " + Arrays.toString(input));
    }
}`},{id:"timSort",label:"1. timSort()",description:"Quét mảng tạo run tự nhiên, mở rộng đến MIN_RUN, lưu ranh giới [runStart, runEnd] và gộp theo từng lượt.",code:`public static void timSort(int[] a) {
    int n = a.length;
    if (n < 2) return;
    int[] runStart = new int[n];
    int[] runEnd = new int[n];
    int runCount = 0, start = 0;

    // 1. Phát hiện run tăng dần và mở rộng đến MIN_RUN
    while (start < n) {
        int naturalEnd = start + 1;
        while (naturalEnd < n && a[naturalEnd - 1] <= a[naturalEnd]) {
            naturalEnd++;
        }
        int end = Math.min(n, Math.max(naturalEnd, start + MIN_RUN));
        insertionSort(a, start, end - 1);
        runStart[runCount] = start;
        runEnd[runCount] = end - 1;
        runCount++;
        start = end;
    }

    // 2. Gộp các run kề nhau theo từng lượt
    while (runCount > 1) {
        int nextCount = 0;
        for (int i = 0; i < runCount; i += 2) {
            if (i + 1 < runCount) {
                int left = runStart[i], mid = runEnd[i], right = runEnd[i + 1];
                merge(a, left, mid, right);
                runStart[nextCount] = left;
                runEnd[nextCount] = right;
            } else {
                runStart[nextCount] = runStart[i];
                runEnd[nextCount] = runEnd[i];
            }
            nextCount++;
        }
        runCount = nextCount;
    }
}`},{id:"insertionSort",label:"2. insertionSort()",description:"Sắp xếp đoạn đóng [left, right]. Điều kiện a[j] > key (không dùng >=) giúp giữ nguyên thứ tự các phần tử bằng khóa.",code:`// Insertion sort trên đoạn đóng [left, right].
private static void insertionSort(int[] a, int left, int right) {
    for (int i = left + 1; i <= right; i++) {
        int key = a[i];
        int j = i - 1;
        // Dùng > thay vì >= để không đổi thứ tự các khóa bằng nhau (Stable).
        while (j >= left && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
}`},{id:"merge",label:"3. merge()",description:"Cấp phát mảng tạm temp kích thước right - left + 1, trộn ổn định (<=) hai đoạn [left..mid] và [mid+1..right] rồi chép lại mảng gốc.",code:`// Trộn hai đoạn đã sắp xếp: [left, mid] và [mid + 1, right].
private static void merge(int[] a, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;

    while (i <= mid && j <= right) {
        // <= đảm bảo phần tử bên trái được ưu tiên khi bằng khóa (Stable Sort)
        temp[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];
    }
    while (i <= mid) temp[k++] = a[i++];
    while (j <= right) temp[k++] = a[j++];

    System.arraycopy(temp, 0, a, left, temp.length);
}`}],ie=`import math

def introsort(arr, size_threshold=16, max_depth=None, key=lambda x: x):
    n = len(arr)
    if n <= 1:
        return arr
    depth_limit = max_depth if max_depth is not None else 2 * int(math.log2(n))
    _introsort_util(arr, 0, n - 1, depth_limit, size_threshold, key)
    return arr

def _introsort_util(arr, low, high, depth_limit, size_threshold, key):
    while high - low + 1 > size_threshold:
        if depth_limit == 0:  # Chặn suy biến O(n^2)
            heapsort_subarray(arr, low, high, key)
            return
        depth_limit -= 1
        p = partition_median_of_three(arr, low, high, key)
        _introsort_util(arr, p + 1, high, depth_limit, size_threshold, key) # Đệ quy nửa phải
        high = p - 1  # Khử đệ quy đuôi nửa trái
    if low < high:
        insertion_sort(arr, low, high, key)`,ae=`def _sift_down(arr, offset, heap_size, root_idx, key):
    while True:
        largest = root_idx
        left = 2 * root_idx + 1
        right = 2 * root_idx + 2

        # Cộng độ lệch offset (= low) để ánh xạ trực tiếp vào mảng gốc
        if left < heap_size and key(arr[offset + left]) > key(arr[offset + largest]):
            largest = left
        if right < heap_size and key(arr[offset + right]) > key(arr[offset + largest]):
            largest = right
        if largest == root_idx:
            break

        arr[offset + root_idx], arr[offset + largest] = (
            arr[offset + largest], arr[offset + root_idx]
        )
        root_idx = largest

def heapsort_subarray(arr, low, high, key):
    n = high - low + 1
    for i in range(n // 2 - 1, -1, -1):
        _sift_down(arr, low, n, i, key)
    for end in range(n - 1, 0, -1):
        arr[low], arr[low + end] = arr[low + end], arr[low]
        _sift_down(arr, low, end, 0, key)`,oe=`class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        def heap_sort(lo, hi):
            n = hi - lo + 1
            def sift(i, size):
                while 2 * i + 1 < size:
                    j = 2 * i + 1
                    if j + 1 < size and nums[lo + j] < nums[lo + j + 1]:
                        j += 1
                    if nums[lo + i] >= nums[lo + j]:
                        break
                    nums[lo + i], nums[lo + j] = nums[lo + j], nums[lo + i]
                    i = j
            for i in range(n // 2 - 1, -1, -1):
                sift(i, n)
            for end in range(n - 1, 0, -1):
                nums[lo], nums[lo + end] = nums[lo + end], nums[lo]
                sift(0, end)

        def intro(lo, hi, depth):
            if lo >= hi: return
            if hi - lo + 1 <= 16: # Insertion Sort
                for i in range(lo + 1, hi + 1):
                    x, j = nums[i], i - 1
                    while j >= lo and nums[j] > x:
                        nums[j + 1] = nums[j]
                        j -= 1
                    nums[j + 1] = x
                return
            if depth == 0:        # Heapsort fallback
                heap_sort(lo, hi)
                return
            pivot, p = nums[hi], lo
            for j in range(lo, hi):
                if nums[j] < pivot:
                    nums[p], nums[j] = nums[j], nums[p]
                    p += 1
            nums[p], nums[hi] = nums[hi], nums[p]
            intro(lo, p - 1, depth - 1)
            intro(p + 1, hi, depth - 1)

        n = len(nums)
        depth = 2 * (n.bit_length() - 1) if n else 0
        intro(0, n - 1, depth)
        return nums`,re=[{name:"Timsort",theme:"timsort",mechanism:"Lai: Merge + Insertion",best:"Θ(n)",average:"Θ(n log n)",worst:"Θ(n log n)",space:"O(n)",stable:"Có",tradeoff:"Tận dụng natural runs cực nhanh; cần O(n) RAM phụ",apps:"Python, Java Objects, V8 JS, Android"},{name:"Introsort",theme:"introsort",mechanism:"Lai: Quick + Heap + Insertion",best:"Θ(n log n)",average:"Θ(n log n)",worst:"Θ(n log n)",space:"Θ(log n)",stable:"Không",tradeoff:"Thân thiện CPU Cache, khóa O(n log n); không ổn định",apps:"C++ std::sort, .NET, Go"},{name:"Heap Sort",theme:"heapsort",mechanism:"Cây nhị phân (Max-Heap)",best:"Θ(n log n) / Θ(n)*",average:"Θ(n log n)",worst:"Θ(n log n)",space:"O(1)",stable:"Không",tradeoff:"O(1) RAM tuyệt đối, không dùng Stack; Cache Miss cao",apps:"Linux Kernel (lib/sort.c), Embedded"},{name:"Quick Sort",theme:"neutral",mechanism:"Chia để trị (Phân hoạch)",best:"Θ(n log n)",average:"Θ(n log n)",worst:"Θ(n²)",space:"Θ(log n)..O(n)",stable:"Không",tradeoff:"Nhanh trung bình trên RAM; rủi ro O(n²) & tràn Stack",apps:"Sắp xếp mảng nguyên thủy trong RAM"},{name:"Merge Sort",theme:"neutral",mechanism:"Chia để trị (Gộp mảng)",best:"Θ(n log n)",average:"Θ(n log n)",worst:"Θ(n log n)",space:"O(n)",stable:"Có",tradeoff:"Ổn định, khóa O(n log n); tốn O(n) bộ nhớ phụ",apps:"Sắp xếp ngoại (External Sort), Linked List"}],H=[{id:1,chapter:"intro",theme:"hero",title:"KHOẢNG CÁCH GIỮA SÁCH GIÁO KHOA VÀ HỆ THỐNG THỰC TẾ",subtitle:"Phân tích, Mô phỏng & Ứng dụng của Timsort, Introsort và Heap Sort",duration:"0.5 phút",speakerNotes:'Chào thầy/cô và các bạn. Hôm nay nhóm chúng tôi trình bày đề tài "Khoảng cách giữa sách giáo khoa và hệ thống thực tế" thông qua ba thuật toán sắp xếp trụ cột trong môi trường Production: Timsort (Python, Java Objects, V8 JS), Introsort (C++ std::sort, .NET, Go) và Heap Sort (Linux Kernel, Hệ thống nhúng).'},{id:2,chapter:"intro",theme:"hero",title:"Mở bài — Tại sao các thuật toán sách giáo khoa chưa đủ?",subtitle:"Những góc khuất khi đưa Bubble, Merge và Quick Sort vào Production",duration:"1.0 phút",speakerNotes:"Sắp xếp dữ liệu là bài toán kinh điển. Các thuật toán cơ bản như Bubble, Selection hay Insertion Sort đạt O(n²). Lên mức cao hơn, Merge Sort và Quick Sort tạo bước ngoặt với O(n log n). Tuy nhiên, trong môi trường thực tế: Quick Sort có nguy cơ suy thoái về O(n²) hoặc tràn Stack O(n); Merge Sort ổn định nhưng tốn O(n) RAM phụ; còn dữ liệu đời thực hiếm khi ngẫu nhiên hoàn toàn mà chứa nhiều đoạn đã có thứ tự cục bộ (natural runs). Đó là lý do các thuật toán lai như Timsort, Introsort và chốt chặn Heap Sort ra đời."},{id:3,chapter:"timsort",theme:"timsort",title:"Timsort — Bài toán & Ý tưởng cốt lõi",subtitle:"Thuật toán lai giữa Merge Sort và Insertion Sort (Tim Peters, 2002)",duration:"1.0 phút",speakerNotes:"Timsort do Tim Peters thiết kế năm 2002. Mục tiêu không chỉ nhanh trên dữ liệu ngẫu nhiên mà còn tận dụng cấu trúc có sẵn và giữ tính ổn định (Stable Sort) — tức các phần tử có khóa bằng nhau (như bản ghi cùng điểm hoặc cùng ngày) giữ nguyên thứ tự tương đối ban đầu. Timsort vận hành dựa trên 4 cơ chế: (1) Phát hiện Natural Runs; (2) Mở rộng run ngắn hơn minrun (32–64 ngoài thực tế, đặt bằng 4 trong bản học tập) bằng Binary Insertion Sort; (3) Duy trì Merge Stack cân bằng kích thước; và (4) Chế độ Galloping nhảy bước khi một run thắng liên tiếp."},{id:4,chapter:"timsort",theme:"timsort",title:"Timsort — Mô phỏng Biểu đồ Cột Trực Quan",subtitle:"Mảng đầu vào A = [3, 5, 7, 2, 4, 6, 9, 1, 8, 10] với tham số minrun = 4",duration:"1.5 phút",speakerNotes:'Hãy bấm nút "Tự động chạy" hoặc "Bước tiếp" để quan sát trực quan thuật toán Timsort trên biểu đồ cột với tham số minrun = 4. Trình mô phỏng tái hiện chi tiết từng khung hình: (1) Phát hiện Natural Runs tăng/giảm tự nhiên (nếu giảm thì đảo ngược tại chỗ); (2) Mở rộng các run ngắn hơn minrun = 4 bằng Insertion Sort từng bước chèn/dịch; (3) Trộn các run theo bất biến Run Stack (mergeCollapse) bằng hai con trỏ. Bạn cũng có thể kéo thanh tốc độ hoặc bấm "Mảng ngẫu nhiên" để thử nghiệm dữ liệu mới.'},{id:5,chapter:"timsort",theme:"timsort",title:"Timsort — Cài đặt bằng Java (Java Implementation)",subtitle:"Biến thể TimSortDemo rút gọn gồm timSort(), insertionSort() và merge()",duration:"1.0 phút",speakerNotes:"Đây là mã nguồn Java 8+ cài đặt 3 phương thức cốt lõi: timSort() quét run và gộp theo cặp từng lượt; insertionSort() sắp xếp đoạn đóng [left, right] sử dụng điều kiện a[j] > key (thay vì >=) để bảo toàn tính ổn định; và merge() dùng mảng phụ temp với điều kiện a[i] <= a[j] nhằm ưu tiên phần tử run trái khi bằng khóa. Lưu ý đây là mô hình giảng dạy (minrun = 4), bản sản xuất trong OpenJDK có thêm đảo run giảm dần, merge stack invariant và galloping mode."},{id:6,chapter:"timsort",theme:"timsort",title:"Timsort — Độ phức tạp Thời gian & Không gian",subtitle:"Đánh đổi O(n) RAM phụ để lấy Stability và tốc độ O(n) trên dữ liệu gần sắp xếp",duration:"1.0 phút",speakerNotes:"Về thời gian: Best Case đạt O(n) khi mảng đã tăng dần sẵn (chỉ quét 1 lượt phát hiện 1 run duy nhất, không merge). Average Case và Worst Case đều khóa chặt ở O(n log n) nhờ cơ chế quản lý kích thước run. Về không gian: Tốn O(n) bộ nhớ phụ cho vùng đệm tạm khi merge và run stack. Trong Java, mảng kiểu nguyên thủy dùng Dual-Pivot Quicksort để tiết kiệm RAM, còn mảng đối tượng (Object[]) dùng Timsort vì tính ổn định là tối quan trọng."},{id:7,chapter:"timsort",theme:"timsort",title:"Timsort — Bài toán Ứng dụng Thực tế",subtitle:"Ngôn ngữ lập trình hiện đại, Hệ thống Server Logs & LeetCode 88",duration:"1.0 phút",speakerNotes:"Timsort là mặc định trong Python (sort(), sorted()), Java (Arrays.sort(Object[]), Collections.sort()), Android và V8 JS Engine. Một bài toán thực tế điển hình là tổng hợp Server Logs từ nhiều máy chủ bị lệch nhẹ timestamp do độ trễ mạng: dữ liệu gồm nhiều run gần tăng dần, gọi logs.sort(Comparator.comparing(entry -> entry.timestamp)) vừa nhanh vừa giữ nguyên thứ tự các log trùng timestamp. Tư tưởng tận dụng run đã sắp xếp cũng liên hệ trực tiếp tới LeetCode 88 (Merge Sorted Array) dùng 2 con trỏ trong O(m + n)."},{id:8,chapter:"introsort",theme:"introsort",title:"Introsort — Mục tiêu cốt lõi & 3 Trụ cột",subtitle:"Tác giả David R. Musser (1997) — Bảo vệ std::sort của C++ STL",duration:"1.0 phút",speakerNotes:"Chào thầy/cô và các bạn, tiếp theo là thuật toán Introsort (Introspective Sort) do David Musser tạo ra năm 1997 để bảo vệ std::sort của C++ STL. Mục tiêu của Introsort là vừa nhanh như Quicksort ở trung bình, vừa khóa chặt thời gian xấu nhất ở O(n log n). Tại sao cần kết hợp 3 thuật toán? Vì chỉ dùng Quicksort dễ suy biến O(n²) và tràn stack; chỉ dùng Heapsort bị Cache Miss chậm hơn 2–3 lần; không có Insertion Sort sẽ lãng phí tới 75% số lời gọi hàm đệ quy ở các đoạn 1–2 phần tử."},{id:9,chapter:"introsort",theme:"introsort",title:"Introsort — Nguyên lý điều phối & Lưu đồ hoạt động",subtitle:"Lưu đồ hàm _introsort_util(low, high, depth_limit) với depth_limit = 2 * floor(log2(n))",duration:"1.5 phút",speakerNotes:"Lưu đồ thể hiện chính xác logic của _introsort_util: Ở gốc khởi tạo depth_limit = 2 * floor(log2(n)). Tại mỗi nhánh: Bước 1 kiểm tra đoạn nhỏ size <= 16 -> Đúng chạy Insertion Sort (Khối Xanh lá) và return. Bước 2 kiểm tra ngân sách độ sâu depth_limit == 0 -> Đúng kích hoạt Heapsort tại chỗ cho đoạn [low..high] (Khối Tím) và return. Bước 3 nếu cả hai đều sai, chọn chốt Median-of-Three, đệ quy nửa phải [p+1..high] và khử đệ quy đuôi cho nửa trái [low..p-1] với depth_limit - 1."},{id:10,chapter:"introsort",theme:"introsort",title:"Introsort — Cây đệ quy & Thước đo Depth",subtitle:"Interactive 2-Tab Trace trên mảng A = [19, 7, 15, 12, 16, 18, 4, 11, 13] (n = 9)",duration:"1.5 phút",speakerNotes:'Ở Slide này có 2 Tab tương tác kèm Cây đệ quy và Thước đo Depth trực quan. Tab 1 minh họa Trường hợp chuẩn (threshold = 3, depth = 6): mảng lướt qua các lần phân hoạch Pivot và Insertion Sort ở các nhánh nhỏ mà chưa chạm ngưỡng depth = 0. Tab 2 chủ động đặt threshold = 2 và depth = 1: khi nửa trái [0..5] chạm vạch đỏ depth = 0, Introsort lập tức kích hoạt Heapsort kèm mô phỏng cây nhị phân Max-Heap bên phải để chặn nguy cơ O(n²). Bạn có thể bấm "Tự động chạy", kéo thanh tốc độ 0.5x–2.5x hoặc bấm trực tiếp vào bất kỳ node nào trên cây đệ quy để nhảy tới bước đó.'},{id:11,chapter:"introsort",theme:"introsort",title:"Introsort — Cài đặt Python & Kỹ thuật Offset Heapsort",subtitle:"Khử đệ quy đuôi và ánh xạ chỉ số offset = low giúp bảo toàn O(1) RAM phụ",duration:"1.5 phút",speakerNotes:"Hàm _introsort_util bên trái thể hiện rõ 3 nhánh rẽ cùng kỹ thuật khử đệ quy đuôi (high = p - 1) cho nửa trái. Điểm kỹ thuật đắt giá nằm ở cột phải: để vun đống trên đoạn con [low..high] mà tuyệt đối không dùng list slicing (arr[a:b]) vốn tốn O(n) bộ nhớ, ta đặt offset = low. Nút cha là low + i, con trái low + 2*i + 1, con phải low + 2*i + 2, đảm bảo thao tác hoán đổi tốn đúng O(1) bộ nhớ phụ."},{id:12,chapter:"introsort",theme:"introsort",title:"Introsort — Chứng minh Độ phức tạp Thời gian & Không gian",subtitle:"Khóa chặt cận trên Θ(n log n) trước Median-of-3 Killer & Call Stack Θ(log n)",duration:"1.5 phút",speakerNotes:"Ngay cả khi gặp chuỗi khắc tinh Median-of-3 Killer: (1) Giai đoạn Quicksort chạy tối đa 2*floor(log2(n)) mức nên tốn <= O(n log n); (2) Giai đoạn Heapsort xử lý các đoạn rời nhau có tổng kích thước <= n nên tổng thời gian <= O(n log n); (3) Giai đoạn Insertion Sort trên các đoạn <= 16 tốn O(n). Cộng lại tổng thời gian luôn khóa chặt ở Θ(n log n)! Về không gian: biến cục bộ là Θ(1), ngăn xếp đệ quy khóa cứng tối đa 2*floor(log2(n)) + 1 khung hàm => Θ(log n), chống tràn Stack tuyệt đối."},{id:13,chapter:"introsort",theme:"introsort",title:"Introsort — Bài toán Ứng dụng Thực tế & LeetCode 912",subtitle:"Sàn Thương mại điện tử, Phân tích Request Logs (P50/P90) & Anti-Quicksort Test Cases",duration:"1.5 phút",speakerNotes:'Introsort tỏa sáng khi sắp xếp hàng triệu sản phẩm theo "Giá từ thấp đến cao" trên sàn TMĐT với tốc độ phản hồi tức thì. Trong phân tích Request Logs (tìm P50, P90 latency), vì Introsort không ổn định (Unstable), kỹ sư xử lý bằng cách đóng gói khóa tuple (latency_ms, arrival_seq) để giữ thứ tự đến trước. Ngoài ra, trên LeetCode 912 (Sort an Array), Introsort vượt qua toàn bộ test case anti-Quicksort khắc nghiệt trong thời gian O(n log n).'},{id:14,chapter:"heapsort",theme:"heapsort",title:"Heap Sort — Bài toán & Ý tưởng cốt lõi (Binary Heap)",subtitle:"Sắp xếp tại chỗ chuẩn O(1) RAM tuyệt đối & O(n log n) mọi trường hợp",duration:"1.0 phút (Phút 1)",speakerNotes:"Tiếp theo, mình xin trình bày về Heap Sort (Sắp xếp vun đống). Bài toán đặt ra là sắp xếp mảng n phần tử tăng dần với một ràng buộc khắc nghiệt hơn Merge Sort và QuickSort: phải sắp xếp ngay tại chỗ (In-place) với bộ nhớ phụ O(1) mà vẫn đảm bảo thời gian O(n log n) ngay cả trong trường hợp xấu nhất. Ý tưởng cốt lõi của Heap Sort là nhìn mảng 1 chiều dưới góc độ một Cây nhị phân hoàn chỉnh (Binary Heap) thông qua công thức chỉ số: nút cha ở vị trí i sẽ có con trái là 2i + 1 và con phải là 2i + 2. Thuật toán gồm 2 bước: Bước 1 là Build Max-Heap để đẩy phần tử lớn nhất lên đỉnh gốc arr[0]. Bước 2 là liên tục hoán đổi đỉnh gốc này về cuối mảng, khóa nó lại, rồi vun lại phần cây còn lại để tìm phần tử lớn tiếp theo."},{id:15,chapter:"heapsort",theme:"heapsort",title:"Heap Sort — Cây nhị phân 'co lại' & Vách ngăn mảng động",subtitle:"Trực quan hóa đồng bộ Cây Heap thu gọn + Mảng 1 chiều có vách ngăn trượt cho arr = [4, 10, 3, 5]",duration:"1.1 phút (Phút 2)",speakerNotes:'Hãy bấm "Tự động chạy" hoặc "Bước tiếp" để theo dõi đồng bộ Cây nhị phân co lại và Mảng 1 chiều có vách ngăn trượt! Pha 1 (Build Max-Heap) liên kết nút cha i với con 2i+1 / 2i+2 bằng vòng cung công thức, đẩy giá trị lớn nhất lên gốc arr[0]. Pha 2 (Rút gốc & Vun lại) liên tục đổi gốc về cuối vùng Heap, khóa nút (thu nhỏ trên cây + ngắt nét đứt cạnh nối), đồng thời trượt vách ngăn xanh-vàng lùi sang trái. Bạn có thể chuyển sang "Ngẫu nhiên (7 phần tử)" để quan sát cây 3 tầng đầy đủ, kéo thanh tốc độ hoặc rê chuột lên từng nút để soi đồng bộ trên mảng.'},{id:16,chapter:"heapsort",theme:"heapsort",title:"Heap Sort — Cài đặt Python (Khử Đệ Quy Chuẩn O(1) RAM)",subtitle:"Bấm vào từng thẻ bên phải (hoặc phím 1, 2, 3, 0) để Spotlight từng khối logic",duration:"1.0 phút (Phút 3)",speakerNotes:'Đây là mã nguồn cài đặt bằng Python. Bạn có thể bấm vào từng thẻ bên phải hoặc bấm phím 1, 2, 3 để spotlight từng khối logic và bấm "Bước tiếp theo" ở thanh Console dưới cùng. Điểm ăn tiền nhất nằm ở hàm sift_down (Phím 1): thay vì gọi đệ quy, vòng lặp while True trượt trực tiếp từ nút cha xuống nút con, đạt chuẩn O(1) RAM phụ tuyệt đối và triệt tiêu hoàn toàn nguy cơ Stack Overflow. Vòng lặp 1 (Phím 2) chạy ngược từ n // 2 - 1 về 0 để Build Max-Heap trong O(n). Vòng lặp 2 (Phím 3) liên tục hoán đổi đỉnh arr[0] về cuối mảng arr[i] và gọi sift_down để khôi phục Max-Heap.'},{id:17,chapter:"heapsort",theme:"heapsort",title:"Heap Sort — Độ phức tạp Thời gian & Không gian",subtitle:"Build Max-Heap O(n), Extract O(n log n), Không gian O(1) tuyệt đối",duration:"0.8 phút (Phút 4)",speakerNotes:"Về độ phức tạp thời gian: Bước Build Heap đầu tiên chỉ mất thời gian tuyến tính O(n), còn bước rút n phần tử mỗi lần tốn log n, nên tổng thời gian của cả Best, Average và Worst Case với dữ liệu phân biệt luôn là O(n log n). Tình huống tạo ra Worst Case (nhiều phép hoán đổi nhất) là khi mỗi lần ta đổi phần tử ở đáy lên đỉnh, nó luôn nhỏ hơn các con và phải trượt một mạch hết chiều cao log2(n) xuống tận lá. Ngược lại, Best Case đặc biệt đạt tới Ω(n) xảy ra khi toàn bộ phần tử trong mảng bằng nhau (như [5, 5, 5, 5]), vì hàm sift_down thoát ngay ở dòng break đầu tiên. Về không gian: chỉ dùng đúng O(1) bộ nhớ phụ."},{id:18,chapter:"heapsort",theme:"heapsort",title:"Heap Sort — Ứng dụng Thực tế (Linux Kernel) & LeetCode 215",subtitle:"Phím D: Mô phỏng tấn công tràn Stack Kernel  |  Phím K: Chạy từng bước Hộp Min-Heap Top-K",duration:"1.0 phút (Phút 5)",speakerNotes:'Vậy tại sao Heap Sort lại sống khỏe trong các hệ thống lõi? Thứ nhất là trong Hệ thống nhúng và nhân Linux Kernel (file lib/sort.c): Kernel Stack chỉ vỏn vẹn 8 KB – 16 KB. Bấm phím D để mô phỏng kịch bản DoS O(n²): nếu dùng QuickSort đệ quy sâu sẽ vượt ngưỡng 16 KB gây Kernel Panic ngay lập tức, trong khi Heap Sort dùng O(1) RAM nên hoàn toàn miễn nhiễm. Thứ hai là nền tảng cho Hàng đợi ưu tiên (Priority Queue) giải quyết bài toán Top-K như LeetCode 215: bấm phím K để chạy từng bước Hộp Min-Heap k = 2 phần tử với đỉnh min_heap[0] đóng vai trò "người gác cổng", giúp đạt thời gian O(n log k) thay vì sort cả mảng O(n log n).'},{id:19,chapter:"summary",theme:"summary",title:"Bảng Tổng hợp So sánh Toàn diện",subtitle:"Đối chiếu 5 thuật toán sắp xếp cốt lõi theo Thời gian, Bộ nhớ, Tính ổn định, Đặc tính & Ứng dụng Production",duration:"1.5 phút",speakerNotes:'Tổng kết lại: Không có một thuật toán sắp xếp "vạn năng" cho mọi bối cảnh — hệ thống Production lựa chọn dựa trên sự đánh đổi giữa thời gian, bộ nhớ phụ, tính ổn định và mức độ thân thiện CPU Cache. Cần Stable và khai thác dữ liệu gần sắp xếp trên Object Arrays thì chọn Timsort (Python, Java Objects, V8 JS); cần tốc độ RAM nhanh nhất nhưng vẫn khóa chặt cận trên O(n log n) thì chọn Introsort (C++ std::sort, .NET, Go); còn khi tài nguyên RAM và Stack bị siết chặt tuyệt đối như nhân Linux Kernel hay Hệ thống nhúng thì Heap Sort là chốt chặn an toàn duy nhất.'}],lt=[3,5,7,2,4,6,9,1,8,10],tt=4,nt={1:{delay:1300,label:"Rất chậm"},2:{delay:900,label:"Chậm"},3:{delay:550,label:"Vừa"},4:{delay:300,label:"Nhanh"},5:{delay:140,label:"Rất nhanh"}},st={init:{text:"Khởi tạo",badgeClass:"tim-badge-init"},runs:{text:"Tạo Runs",badgeClass:"tim-badge-runs"},merge:{text:"Trộn Runs",badgeClass:"tim-badge-merge"},done:{text:"Hoàn tất",badgeClass:"tim-badge-done"}};function wt(t){const e=[...t],s=e.length,a=[],i=[];let c=0,r=0,p=0;function d({phase:o,title:g,description:x,highlights:m={},activeIndices:f=[],runsOverride:k=null}){const w=(k||i).map(C=>({...C}));a.push({array:[...e],phase:o,title:g,description:x,highlights:{...m},activeIndices:[...f],runs:w,comparisons:c,writes:r})}function l(){const o={};for(const g of i)for(let x=g.start;x<g.start+g.len;x++)o[x]="sorted";return o}d({phase:"init",title:"Bước 0: Mảng đầu vào (Input)",description:`Mảng ${s} phần tử A = [${e.join(", ")}] với tham số minrun = ${tt}. Nhấn "▶ Tự động chạy" để xem quá trình Timsort.`});let h=0;for(;h<s;){p++;const o=h;let g=h;if(g<s-1)if(c++,e[g+1]<e[g]){for(g++;g<s-1&&(c++,e[g+1]<e[g]);)g++;const C=l();for(let v=o;v<=g;v++)C[v]="compare";d({phase:"runs",title:`Tìm Natural Run ${p} (giảm dần)`,description:`Phát hiện dãy giảm dần tự nhiên tại [${o}..${g}] = [${e.slice(o,g+1).join(", ")}]. Cần đảo ngược thành tăng dần.`,highlights:C,activeIndices:Array.from({length:g-o+1},(v,S)=>o+S),runsOverride:[...i,{start:o,len:g-o+1,label:`Run ${p} [${o}..${g}]`,active:!0}]});let $=o,E=g;for(;$<E;){const v=e[$];e[$]=e[E],e[E]=v,r+=2,$++,E--}const I=l();for(let v=o;v<=g;v++)I[v]="insert";d({phase:"runs",title:`Đảo ngược Natural Run ${p}`,description:`Đã đảo ngược Run ${p} [${o}..${g}] thành dãy tăng dần [${e.slice(o,g+1).join(", ")}].`,highlights:I,activeIndices:Array.from({length:g-o+1},(v,S)=>o+S),runsOverride:[...i,{start:o,len:g-o+1,label:`Run ${p} [${o}..${g}]`,active:!0}]})}else{for(g++;g<s-1&&(c++,e[g+1]>=e[g]);)g++;const C=l();for(let $=o;$<=g;$++)C[$]="compare";d({phase:"runs",title:`Phát hiện Natural Run ${p} [${o}..${g}]`,description:`Tìm thấy dãy tăng tự nhiên [${e.slice(o,g+1).join(", ")}] (độ dài ${g-o+1}).`,highlights:C,activeIndices:Array.from({length:g-o+1},($,E)=>o+E),runsOverride:[...i,{start:o,len:g-o+1,label:`Run ${p} [${o}..${g}]`,active:!0}]})}else{const w=l();w[o]="compare",d({phase:"runs",title:`Phát hiện Run ${p} [${o}..${o}]`,description:`Phần tử cuối cùng [${e[o]}] tạo thành Run ${p} độ dài 1.`,highlights:w,activeIndices:[o],runsOverride:[...i,{start:o,len:1,label:`Run ${p} [${o}]`,active:!0}]})}const x=g-o+1,m=Math.min(o+tt-1,s-1);if(m>g){const w={start:o,len:m-o+1,label:`Run ${p} [${o}..${m}]`,active:!0},C=l();for(let $=o;$<=m;$++)C[$]="compare";d({phase:"runs",title:`Mở rộng Run ${p} [${o}..${m}] bằng Insertion Sort`,description:`Độ dài tự nhiên (${x}) < minrun (${tt}). Mở rộng Run ${p} đến chỉ số ${m} và sắp xếp chèn.`,highlights:C,activeIndices:[g+1],runsOverride:[...i,w]});for(let $=g+1;$<=m;$++){const E=e[$];let I=$-1;const v=l();for(let T=o;T<$;T++)v[T]="compare";for(v[$]="insert",d({phase:"runs",title:`Insertion Sort — Chọn giá trị ${E} (chỉ số ${$})`,description:`Xét phần tử A[${$}] = ${E} để chèn vào đúng vị trí trong Run ${p} [${o}..${m}].`,highlights:v,activeIndices:[$],runsOverride:[...i,w]});I>=o;){c++;const T=l();for(let N=o;N<=$;N++)T[N]="compare";if(T[I]="compare",T[I+1]="insert",e[I]>E)e[I+1]=e[I],r++,d({phase:"runs",title:`Insertion Sort — Dịch chuyển ${e[I]} sang phải`,description:`So sánh ${E} < ${e[I]}: dịch phần tử ${e[I]} từ vị trí ${I} sang ${I+1}.`,highlights:{...T,[I]:"insert",[I+1]:"insert"},activeIndices:[I,I+1],runsOverride:[...i,w]}),I--;else{d({phase:"runs",title:`Insertion Sort — Tìm thấy vị trí chèn cho ${E}`,description:`So sánh ${E} ≥ ${e[I]}: dừng dịch chuyển, đặt ${E} tại chỉ số ${I+1}.`,highlights:T,activeIndices:[I,I+1],runsOverride:[...i,w]});break}}e[I+1]=E,r++;const S=l();for(let T=o;T<=$;T++)S[T]="sorted";S[I+1]="insert",d({phase:"runs",title:`Insertion Sort — Đã chèn ${E} vào vị trí ${I+1}`,description:`Đặt giá trị ${E} vào A[${I+1}]. Đoạn [${o}..${$}] đã tăng dần: [${e.slice(o,$+1).join(", ")}].`,highlights:S,activeIndices:[I+1],runsOverride:[...i,w]})}g=m}const f=g-o+1;i.push({start:o,len:f,label:`Run ${p} [${o}..${g}]`});const k=l();d({phase:"runs",title:`Hoàn tất Run ${p} [${o}..${g}]`,description:`Run ${p} = [${e.slice(o,g+1).join(", ")}] (độ dài ${f}) đã được đưa vào Run Stack.`,highlights:k,activeIndices:Array.from({length:f},(w,C)=>o+C)}),u(),h=g+1}for(;i.length>1;){let o=i.length-2;o>0&&i[o-1].len<i[o+1].len&&o--,y(o)}const b={};for(let o=0;o<s;o++)b[o]="sorted";return d({phase:"done",title:"Hoàn tất sắp xếp Timsort!",description:`Mảng đã được sắp xếp tăng dần hoàn chỉnh: [${e.join(", ")}]. Tổng cộng ${c} phép so sánh và ${r} lần ghi/dịch chuyển.`,highlights:b,runsOverride:[{start:0,len:s,label:`Mảng đã sắp xếp [0..${s-1}]`,done:!0}]}),a;function u(){for(;i.length>1;){let o=i.length-2;const g=o>0&&i[o-1].len<=i[o].len+i[o+1].len,x=o>1&&i[o-2].len<=i[o-1].len+i[o].len;if(g||x)i[o-1].len<i[o+1].len&&o--,y(o);else if(i[o].len<=i[o+1].len)y(o);else break}}function y(o){const g=i[o],x=i[o+1],m=g.start,f=g.len,k=x.start,w=x.len,C=k+w-1,$=e.slice(m,m+f),E=e.slice(k,k+w),I=l();for(let B=m;B<m+f;B++)I[B]="mergeLeft";for(let B=k;B<=C;B++)I[B]="mergeRight";d({phase:"merge",title:`Trộn ${g.label} và ${x.label}`,description:`Bắt đầu trộn Run trái [${$.join(", ")}] và Run phải [${E.join(", ")}] vào đoạn [${m}..${C}].`,highlights:I,activeIndices:Array.from({length:f+w},(B,A)=>m+A)});let v=0,S=0,T=m;for(;v<f&&S<w;){c++;const B=$[v],A=E[S];if(B<=A){e[T]=B,r++;const O=l();for(let M=m;M<T;M++)O[M]="sorted";for(let M=T+1;M<=C;M++)O[M]="mergeRight";O[T]="mergeWrite",d({phase:"merge",title:`Đang trộn [${m}..${C}] — Ghi giá trị ${B}`,description:`So sánh ${B} (trái) ≤ ${A} (phải): chọn ${B} đưa vào vị trí A[${T}].`,highlights:O,activeIndices:[T]}),v++}else{e[T]=A,r++;const O=l();for(let M=m;M<T;M++)O[M]="sorted";for(let M=T+1;M<=C;M++)O[M]="mergeLeft";O[T]="mergeWrite",d({phase:"merge",title:`Đang trộn [${m}..${C}] — Ghi giá trị ${A}`,description:`So sánh ${A} (phải) < ${B} (trái): chọn ${A} đưa vào vị trí A[${T}].`,highlights:O,activeIndices:[T]}),S++}T++}for(;v<f;){e[T]=$[v],r++;const B=l();for(let A=m;A<T;A++)B[A]="sorted";B[T]="mergeWrite",d({phase:"merge",title:`Đang trộn [${m}..${C}] — Chép phần còn lại`,description:`Run phải đã hết, chép phần tử còn lại ${$[v]} từ Run trái vào A[${T}].`,highlights:B,activeIndices:[T]}),v++,T++}for(;S<w;){e[T]=E[S],r++;const B=l();for(let A=m;A<T;A++)B[A]="sorted";B[T]="mergeWrite",d({phase:"merge",title:`Đang trộn [${m}..${C}] — Chép phần còn lại`,description:`Run trái đã hết, chép phần tử còn lại ${E[S]} từ Run phải vào A[${T}].`,highlights:B,activeIndices:[T]}),S++,T++}i.splice(o,2,{start:m,len:f+w,label:`Merged [${m}..${C}]`});const N=l();d({phase:"merge",title:`Hoàn tất trộn đoạn [${m}..${C}]`,description:`Đã trộn xong thành Run mới [${e.slice(m,C+1).join(", ")}] (độ dài ${f+w}).`,highlights:N,activeIndices:Array.from({length:f+w},(B,A)=>m+A)})}}function le(t=10,e=20){const s=Array.from({length:e},(a,i)=>i+1);for(let a=s.length-1;a>0;a--){const i=Math.floor(Math.random()*(a+1));[s[a],s[i]]=[s[i],s[a]]}return s.slice(0,t)}const ce=[19,7,15,12,16,18,4,11,13],de=[15,12,13,7,4,11],G=[{x:140,y:28},{x:76,y:92},{x:204,y:92},{x:40,y:156},{x:112,y:156},{x:168,y:156}],he=[[0,1],[0,2],[1,3],[1,4],[2,5]],ft={tab1:{id:"tab1",label:"Tab 1: Trường hợp chuẩn (threshold=3, depth=6)",threshold:3,initialDepth:6,minHeightPx:290,rowCentersPct:[12,34,56,78,93],depthRows:[{depth:6,label:"Depth = 6",sub:"Bắt đầu",isDanger:!1},{depth:5,label:"Depth = 5",sub:"Tầng 2",isDanger:!1},{depth:4,label:"Depth = 4",sub:"Tầng 3",isDanger:!1},{depth:3,label:"Depth = 3",sub:"Tầng 4",isDanger:!1},{depth:0,label:"Depth = 0",sub:"Ngưỡng Heapsort",isDanger:!0,isCompactWarning:!0}],steps:[{step:0,range:[0,8],size:9,depth:6,algo:"Khởi tạo",algoType:"init",array:[19,7,15,12,16,18,4,11,13],pivotIndex:null,leftRange:null,rightRange:null,sortedIndices:[],activeNodeId:null,description:"Mảng đầu vào gồm 9 phần tử A = [19, 7, 15, 12, 16, 18, 4, 11, 13], ngưỡng Insertion Sort = 3, giới hạn độ sâu = 6."},{step:1,range:[0,8],size:9,depth:6,algo:"Quicksort",algoType:"quick",array:[13,7,15,12,4,11,16,19,18],pivotIndex:6,leftRange:[0,5],rightRange:[7,8],sortedIndices:[6],activeNodeId:"t1-n1",description:"Trung vị (19, 16, 13) → Pivot = 16 định vị tại p = 6. Nửa trái [0..5], Pivot [6], Nửa phải [7..8]. Đệ quy phải [7..8], lặp trái [0..5]."},{step:2,range:[7,8],size:2,depth:5,algo:"Insertion Sort",algoType:"insertion",array:[13,7,15,12,4,11,16,18,19],pivotIndex:null,leftRange:null,rightRange:null,sortedIndices:[6,7,8],activeNodeId:"t1-n2",description:"Đệ quy nửa phải [7..8]: Size = 2 ≤ 3 → Insertion Sort đổi (19, 18) thành (18, 19)."},{step:3,range:[0,5],size:6,depth:5,algo:"Quicksort",algoType:"quick",array:[11,7,12,4,13,15,16,18,19],pivotIndex:4,leftRange:[0,3],rightRange:[5,5],sortedIndices:[4,6,7,8],activeNodeId:"t1-n3",description:"Lặp trái high=5: Trung vị (13, 15, 11) → Pivot = 13 về p = 4. Nửa trái [0..3], Pivot [4], Nửa phải [5..5]."},{step:4,range:[5,5],size:1,depth:4,algo:"Insertion Sort",algoType:"insertion",array:[11,7,12,4,13,15,16,18,19],pivotIndex:null,leftRange:null,rightRange:null,sortedIndices:[4,5,6,7,8],activeNodeId:"t1-n4",description:"Đệ quy nửa phải [5..5]: Size = 1 ≤ 3 → Giữ nguyên [15]."},{step:5,range:[0,3],size:4,depth:4,algo:"Quicksort",algoType:"quick",array:[4,7,12,11,13,15,16,18,19],pivotIndex:1,leftRange:[0,0],rightRange:[2,3],sortedIndices:[1,4,5,6,7,8],activeNodeId:"t1-n5",description:"Lặp trái high=3: Trung vị (11, 7, 4) → Pivot = 7 về p = 1. Nửa trái [0..0], Pivot [1], Nửa phải [2..3]."},{step:6,range:[2,3],size:2,depth:3,algo:"Insertion Sort",algoType:"insertion",array:[4,7,11,12,13,15,16,18,19],pivotIndex:null,leftRange:null,rightRange:null,sortedIndices:[1,2,3,4,5,6,7,8],activeNodeId:"t1-n6",description:"Đệ quy nửa phải [2..3]: Size = 2 ≤ 3 → Đổi (12, 11) thành (11, 12)."},{step:7,range:[0,0],size:1,depth:3,algo:"Insertion Sort",algoType:"insertion",array:[4,7,11,12,13,15,16,18,19],pivotIndex:null,leftRange:null,rightRange:null,sortedIndices:[0,1,2,3,4,5,6,7,8],activeNodeId:"t1-n7",description:"Lặp trái high=0: Size = 1 ≤ 3 → Giữ nguyên [4]. Hoàn tất toàn mảng [4, 7, 11, 12, 13, 15, 16, 18, 19] mà chưa cần chạm tới Heapsort."}],nodes:[{id:"t1-n1",step:1,rowIndex:0,xPercent:54,algoType:"quick",badge:"B1 • Quicksort",rangeText:"[0..8] (9)",detail:"Pivot = 16 (p=6)"},{id:"t1-n3",step:3,rowIndex:1,xPercent:35,algoType:"quick",badge:"B3 • Quicksort",rangeText:"[0..5] (6)",detail:"Pivot = 13 (p=4)"},{id:"t1-n2",step:2,rowIndex:1,xPercent:78,algoType:"insertion",badge:"B2 • Insertion",rangeText:"[7..8] (2 ≤ 3)",detail:"[18, 19] ✓"},{id:"t1-n5",step:5,rowIndex:2,xPercent:25,algoType:"quick",badge:"B5 • Quicksort",rangeText:"[0..3] (4)",detail:"Pivot = 7 (p=1)"},{id:"t1-n4",step:4,rowIndex:2,xPercent:58,algoType:"insertion",badge:"B4 • Insertion",rangeText:"[5..5] (1 ≤ 3)",detail:"[15] ✓"},{id:"t1-n7",step:7,rowIndex:3,xPercent:14,algoType:"insertion",badge:"B7 • Insertion",rangeText:"[0..0] (1 ≤ 3)",detail:"[4] ✓"},{id:"t1-n6",step:6,rowIndex:3,xPercent:43,algoType:"insertion",badge:"B6 • Insertion",rangeText:"[2..3] (2 ≤ 3)",detail:"[11, 12] ✓"}],edges:[{from:"t1-n1",to:"t1-n3",branch:"left",label:"Lặp trái",revealStep:3},{from:"t1-n1",to:"t1-n2",branch:"right",label:"Đệ quy phải",revealStep:2},{from:"t1-n3",to:"t1-n5",branch:"left",label:"Lặp trái",revealStep:5},{from:"t1-n3",to:"t1-n4",branch:"right",label:"Đệ quy phải",revealStep:4},{from:"t1-n5",to:"t1-n7",branch:"left",label:"Lặp trái",revealStep:7},{from:"t1-n5",to:"t1-n6",branch:"right",label:"Đệ quy phải",revealStep:6}]},tab2:{id:"tab2",label:"Tab 2: Kích hoạt Heapsort (threshold=2, depth=1)",threshold:2,initialDepth:1,minHeightPx:250,rowCentersPct:[24,72],depthRows:[{depth:1,label:"Depth = 1",sub:"Bắt đầu",isDanger:!1},{depth:0,label:"Depth = 0",sub:"Kích hoạt Heapsort",isDanger:!0,isCompactWarning:!1}],steps:[{step:0,range:[0,8],size:9,depth:1,algo:"Khởi tạo",algoType:"init",array:[19,7,15,12,16,18,4,11,13],pivotIndex:null,leftRange:null,rightRange:null,sortedIndices:[],activeNodeId:null,description:"Thiết lập threshold = 2, depth = 1 trên mảng A = [19, 7, 15, 12, 16, 18, 4, 11, 13] để kích hoạt cơ chế bảo vệ Heapsort."},{step:1,range:[0,8],size:9,depth:1,algo:"Quicksort",algoType:"quick",array:[13,7,15,12,4,11,16,19,18],pivotIndex:6,leftRange:[0,5],rightRange:[7,8],sortedIndices:[6],activeNodeId:"t2-n1",description:"Trung vị (19, 16, 13) → Pivot = 16 về p = 6. Depth giảm xuống 0. Đệ quy phải [7..8], lặp trái [0..5]."},{step:2,range:[7,8],size:2,depth:0,algo:"Insertion Sort",algoType:"insertion",array:[13,7,15,12,4,11,16,18,19],pivotIndex:null,leftRange:null,rightRange:null,sortedIndices:[6,7,8],activeNodeId:"t2-n2",description:"Đệ quy nửa phải [7..8]: Size = 2 ≤ 2 (đạt ngưỡng threshold) → Chạy Insertion Sort đổi (19, 18) thành (18, 19)."},{step:3,range:[0,5],size:6,depth:0,algo:"Heapsort — Build Max-Heap",algoType:"heap",array:[15,12,13,7,4,11,16,18,19],pivotIndex:null,leftRange:null,rightRange:null,heapRange:[0,5],sortedIndices:[6,7,8],activeNodeId:"t2-n3",description:"Lặp trái [0..5]: Size = 6 > 2 và depth == 0 → Chạm vạch đỏ! Kích hoạt Heapsort để chặn O(n²). Xây dựng cây Max-Heap: [15, 12, 13, 7, 4, 11]."},{step:4,range:[0,5],size:6,depth:0,algo:"Heapsort — Hoàn tất",algoType:"heap",array:[4,7,11,12,13,15,16,18,19],pivotIndex:null,leftRange:null,rightRange:null,heapRange:[0,5],sortedIndices:[0,1,2,3,4,5,6,7,8],activeNodeId:"t2-n3",description:"Rút lần lượt phần tử lớn nhất từ gốc Max-Heap về cuối đoạn [0..5] → [4, 7, 11, 12, 13, 15]. Hoàn tất toàn mảng với đảm bảo O(n log n)."}],nodes:[{id:"t2-n1",step:1,rowIndex:0,xPercent:50,algoType:"quick",badge:"B1 • Quicksort",rangeText:"[0..8] (9)",detail:"Pivot = 16 (p=6)"},{id:"t2-n3",step:3,extraStep:4,rowIndex:1,xPercent:28,algoType:"heap",badge:"B3–B4 • HEAPSORT",rangeText:"[0..5] (6 > 2, depth=0)",detail:"Chặn O(n²) → O(n log n)"},{id:"t2-n2",step:2,rowIndex:1,xPercent:76,algoType:"insertion",badge:"B2 • Insertion",rangeText:"[7..8] (2 ≤ 2)",detail:"[18, 19] ✓"}],edges:[{from:"t2-n1",to:"t2-n3",branch:"left",label:"Lặp trái (Depth=0)",revealStep:3,isDanger:!0},{from:"t2-n1",to:"t2-n2",branch:"right",label:"Đệ quy phải",revealStep:2}]}},ct=[4,10,3,5];function Tt(t,e){const s=t.map(a=>a.val);return e<=0||e>=s.length?s.join(", "):`${s.slice(0,e).join(", ")} | ${s.slice(e).join(", ")}`}function $t(t){const e=t.map((l,h)=>({id:h,val:l})),s=e.length,a=[];let i=0,c=0;function r({phase:l,phaseLabel:h,pillLabel:b,actionType:u,actionLabel:y,description:o,heapSize:g,comparing:x=null,swapping:m=null,justLocked:f=null}){a.push({items:e.map(k=>({...k})),phase:l,phaseLabel:h,pillLabel:b,actionType:u,actionLabel:y,description:o,heapSize:g,comparing:x,swapping:m,justLocked:f,comparisons:i,swaps:c})}const p=s===4&&t[0]===4&&t[1]===10&&t[2]===3&&t[3]===5;r({phase:"init",phaseLabel:"Khởi tạo",pillLabel:"Khởi tạo",actionType:"init",actionLabel:"Mảng ban đầu",description:p?"Khởi tạo mảng arr = [4, 10, 3, 5] (n = 4). Gốc arr[0] = 4 có con trái arr[1] = 10, con phải arr[2] = 3; con trái của 10 là arr[3] = 5. Bắt đầu Pha 1: Build Max-Heap.":`Khởi tạo mảng ${s} phần tử arr = [${t.join(", ")}] tạo thành cây nhị phân 3 tầng. Bắt đầu Pha 1: Build Max-Heap từ nút nội bộ cuối cùng i = ${Math.floor(s/2)-1} về 0.`,heapSize:s});function d(l,h,b,u,y){let o=h;for(;;){const g=2*o+1,x=2*o+2,m=[];if(g<l&&m.push({idx:g,formula:"2i+1"}),x<l&&m.push({idx:x,formula:"2i+2"}),m.length===0)break;let f=o;g<l&&(i++,e[g].val>e[f].val&&(f=g)),x<l&&(i++,e[x].val>e[f].val&&(f=x));const k=e[o].val,w=m.map(C=>`arr[${C.idx}]=${e[C.idx].val} (${C.formula})`).join(" và ");if(f===o){r({phase:b,phaseLabel:u,pillLabel:`${y} i=${o}`,actionType:"compare",actionLabel:"So sánh (Đạt chuẩn)",description:`So sánh cha arr[${o}]=${k} với ${w}. Vì ${k} đã lớn nhất → nhánh tại i=${o} thỏa mãn tính chất Max-Heap.`,heapSize:l,comparing:{parent:o,children:m}});break}else{const C=e[f].val;r({phase:b,phaseLabel:u,pillLabel:`${y} i=${o}`,actionType:"compare",actionLabel:"So sánh cha & con",description:`So sánh cha arr[${o}]=${k} với ${w}. Nút con arr[${f}]=${C} lớn hơn ${k} → cần hoán đổi để đưa giá trị lớn lên trên.`,heapSize:l,comparing:{parent:o,children:m}});const $=e[o];e[o]=e[f],e[f]=$,c++,r({phase:b,phaseLabel:u,pillLabel:`Đổi ${k}↔${C}`,actionType:"swap",actionLabel:`Hoán đổi [${o}] ↔ [${f}]`,description:`Hoán đổi arr[${o}] (${k}) ↔ arr[${f}] (${C}) đồng bộ trên cả cây và mảng. Trạng thái hiện tại: [${Tt(e,l)}].`,heapSize:l,swapping:[o,f]}),o=f}}}for(let l=Math.floor(s/2)-1;l>=0;l--)d(s,l,"build","Pha 1: Build Max-Heap","Xét");r({phase:"build",phaseLabel:"Pha 1: Build Max-Heap",pillLabel:"Xong Max-Heap",actionType:"done",actionLabel:"Đạt Max-Heap",description:`Hoàn tất Pha 1 (Build Max-Heap)! Toàn bộ cây đã thỏa mãn Cha ≥ Con với giá trị lớn nhất (${e[0].val}) nằm ở gốc arr[0]. Sẵn sàng sang Pha 2.`,heapSize:s});for(let l=s-1;l>=1;l--){const h=s-l,b=e[0].val,u=e[l].val,y=e[0];e[0]=e[l],e[l]=y,c++,r({phase:"extract",phaseLabel:"Pha 2: Rút gốc & Vun lại",pillLabel:`V${h}: Đổi ${b}↔${u}`,actionType:"swap",actionLabel:`Vòng ${h}: Rút gốc arr[0] ↔ arr[${l}]`,description:`Vòng ${h}: Đưa phần tử lớn nhất ở gốc arr[0]=${b} xuống cuối vùng Heap arr[${l}]=${u}.`,heapSize:l+1,swapping:[0,l]}),r({phase:"extract",phaseLabel:"Pha 2: Rút gốc & Vun lại",pillLabel:`Khóa ${b} [${l}]`,actionType:"lock",actionLabel:`Khóa arr[${l}] • Co cây`,description:`Khóa cố định ${b} tại arr[${l}]! Cạnh nối bị ngắt (nét đứt), cây Heap thu nhỏ còn ${l}/${s} nút và vách ngăn mảng trượt lùi sang trái 1 ô.`,heapSize:l,justLocked:l}),l>1&&d(l,0,"extract","Pha 2: Rút gốc & Vun lại",`Vun V${h}`)}return r({phase:"done",phaseLabel:"Hoàn tất",pillLabel:"Hoàn tất ✓",actionType:"done",actionLabel:"Đã sắp xếp ✓",description:`Khóa nốt gốc cuối cùng arr[0]=${e[0].val}. Cây Heap đã thu gọn về 0, vách ngăn mở trọn vùng xanh lá — mảng đã sắp xếp tăng dần hoàn chỉnh: [${e.map(l=>l.val).join(", ")}]!`,heapSize:0,justLocked:0}),a}function pe(){const t=Array.from({length:24},(e,s)=>s+2);for(let e=t.length-1;e>0;e--){const s=Math.floor(Math.random()*(e+1));[t[e],t[s]]=[t[s],t[e]]}return t.slice(0,7)}const Q={chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',notes:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h8"/><path d="M8 14h4"/></svg>',fullscreen:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>'},n={slideIndex:0,showNotes:!1,timsortArray:[...lt],timsortFrames:wt(lt),timsortStep:0,timsortPlaying:!1,timsortTimer:null,timsortSpeed:3,javaTab:"full",introTab:"tab1",introStep:0,introPlaying:!1,introTimer:null,introSpeed:1,introHeapSyncTimer:null,introResizeObserver:null,introPrevIndexMap:new Map,introTileEls:new Map,introIndexEls:[],introTreeNodeEls:new Map,introTreeEdgeEls:[],introHeapNodeEls:new Map,introHeapEdgeEls:[],heapRawArray:[...ct],heapIsSample:!0,heapFrames:$t(ct),heapStep:0,heapPlaying:!1,heapTimer:null,heapSpeed:1,heapHoveredId:null,heapResizeObserver:null,heapTreeNodeEls:new Map,heapArrayTileEls:new Map,heapTreeEdgeEls:[],heapTreeCoords:[],heapPrevPosById:new Map,hs16FocusGroup:null,hs16StepIdx:0,hs17PyramidLvl:3,hs17BestCase:"distinct",hs17RamScale:2,hs17IsDos:!1,hs17LcIdx:0};function z(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ge(t,e){const s=e==="java"?/\b(import|public|private|static|final|class|void|int|if|else|while|for|return|new)\b/g:/\b(import|def|class|if|elif|else|while|for|in|return|and|or|not|is|None|True|False|lambda|break)\b/g;return t.split(`
`).map(a=>{const i=e==="java"?a.indexOf("//"):a.indexOf("#");let c=a,r="";i!==-1&&(c=a.slice(0,i),r=a.slice(i));let p=z(c);return p=p.replace(/(&quot;.*?&quot;|".*?"|'.*?')/g,'<span class="tok-str">$1</span>'),p=p.replace(s,'<span class="tok-kw">$1</span>'),p=p.replace(/\b(\d+)\b/g,'<span class="tok-num">$1</span>'),p=p.replace(/\b([a-zA-Z_]\w*)(?=\s*\()/g,'<span class="tok-fn">$1</span>'),r?`${p}<span class="tok-cm">${z(r)}</span>`:p}).join(`
`)}function V(t,e,s,a=0){return`
    <div class="code-window bento-item" style="--stagger:${a}">
      <div class="code-header">
        <div class="code-dots">
          <span style="background:#FF5F57"></span>
          <span style="background:#FEBC2E"></span>
          <span style="background:#28C840"></span>
        </div>
        <span class="code-filename">${z(t)}</span>
        <span class="badge-pill badge-accent">${e.toUpperCase()}</span>
      </div>
      <pre class="code-pre"><code>${ge(s,e)}</code></pre>
    </div>
  `}function ue(){return`
    <div class="bento-grid bento-grid-auto">
      <div class="bento-card bento-card-accent bento-card-auto col-12 bento-item" style="--stagger:0">
        <div class="flex-row justify-between flex-wrap gap-2">
          <span class="badge-pill badge-blue">Môn học: Cấu trúc dữ liệu và Giải thuật</span>
          <span class="bento-caption">Slide 01 / 19 • 0.5 phút</span>
        </div>
        <h1 class="hero-title mt-3">
          KHOẢNG CÁCH GIỮA SÁCH GIÁO KHOA VÀ HỆ THỐNG THỰC TẾ
          <span style="display:block; font-size:0.56em; color:#A1A1A6; -webkit-text-fill-color:#A1A1A6; margin-top:6px;">
            (PRODUCTION SORTING ALGORITHMS)
          </span>
        </h1>
        <p class="bento-body mt-3" style="max-width:960px;">
          Phân tích, Mô phỏng &amp; Ứng dụng của <strong style="color:#30D158">Timsort</strong>,
          <strong style="color:#BF5AF2">Introsort</strong> và <strong style="color:#FFD60A">Heap Sort</strong>
        </p>
        <div class="bento-subtile flex-row justify-between flex-wrap gap-3 mt-3">
          <span class="bento-body" style="color:#A1A1A6;">
            Sử dụng phím <code>→</code> / <code>Space</code> để chuyển slide • Bấm <code>S</code> để mở Speaker Notes
          </span>
          <button type="button" class="sim-btn primary" data-action="next-slide">
            Bắt đầu bài thuyết trình ${Q.chevronRight}
          </button>
        </div>
      </div>
    </div>

    <div class="bento-grid flex-1 min-h-0">
      <div class="bento-card col-4 bento-item" style="--stagger:1; border-color:rgba(48,209,88,0.35);">
        <div class="flex-row justify-between gap-2">
          <span class="badge-pill badge-mint">Timsort (Tim Peters, 2002)</span>
          <span class="mono bento-caption" style="color:#30D158">Stable</span>
        </div>
        <div class="hero-stat mt-3" style="background:linear-gradient(135deg,#30D158,#64D2FF);-webkit-background-clip:text;background-clip:text;">
          O(n) Best
        </div>
        <h3 class="bento-title mt-2">Merge Sort + Insertion Sort</h3>
        <p class="bento-body mt-2">
          Trái tim của <strong>Python</strong> (<code>sort()</code>, <code>sorted()</code>),
          <strong>Java Object Arrays</strong> (<code>Arrays.sort(Object[])</code>), <strong>V8 JS</strong> và <strong>Android</strong>.
        </p>
      </div>

      <div class="bento-card col-4 bento-item" style="--stagger:2; border-color:rgba(191,90,242,0.38);">
        <div class="flex-row justify-between gap-2">
          <span class="badge-pill badge-purple">Introsort (David R. Musser, 1997)</span>
          <span class="mono bento-caption" style="color:#BF5AF2">In-place</span>
        </div>
        <div class="hero-stat mt-3" style="background:linear-gradient(135deg,#BF5AF2,#5E5CE6);-webkit-background-clip:text;background-clip:text;">
          Θ(n log n)
        </div>
        <h3 class="bento-title mt-2">Quick + Heap + Insertion</h3>
        <p class="bento-body mt-2">
          Sức mạnh đằng sau <code>std::sort</code> của <strong>C++ STL</strong>,
          thư viện chuẩn <strong>.NET</strong> (C#) và ngôn ngữ <strong>Go</strong>.
        </p>
      </div>

      <div class="bento-card col-4 bento-item" style="--stagger:3; border-color:rgba(255,159,10,0.38);">
        <div class="flex-row justify-between gap-2">
          <span class="badge-pill badge-amber">Heap Sort (Binary Heap)</span>
          <span class="mono bento-caption" style="color:#FFD60A">No Stack</span>
        </div>
        <div class="hero-stat mt-3" style="background:linear-gradient(135deg,#FF9F0A,#FFD60A);-webkit-background-clip:text;background-clip:text;">
          O(1) RAM
        </div>
        <h3 class="bento-title mt-2">Sắp xếp vun đống tại chỗ</h3>
        <p class="bento-body mt-2">
          Chốt chặn an toàn tuyệt đối của nhân <strong>Linux Kernel</strong> (<code>lib/sort.c</code>),
          <strong>Embedded Systems</strong> và <strong>Priority Queue</strong>.
        </p>
      </div>
    </div>
  `}function me(){return`
    <div class="bento-grid bento-grid-auto">
      <div class="bento-card col-6 bento-item" style="--stagger:0">
        <div class="flex-row justify-between items-center gap-3">
          <div>
            <span class="badge-pill badge-blue">Nền tảng Sách giáo khoa</span>
            <h3 class="bento-title mt-2">Thuật toán cơ bản</h3>
          </div>
          <div class="hero-stat">O(n²)</div>
        </div>
        <p class="bento-body mt-2">
          <em>Bubble Sort, Selection Sort, Insertion Sort</em> giúp hiểu rõ nguyên lý so sánh từng cặp phần tử,
          nhưng chi phí bậc hai <strong>O(n²)</strong> không thể đáp ứng dữ liệu lớn trong hệ thống thực tế.
        </p>
      </div>

      <div class="bento-card col-6 bento-item" style="--stagger:1">
        <div class="flex-row justify-between items-center gap-3">
          <div>
            <span class="badge-pill badge-mint">Bước ngoặt Chia để trị</span>
            <h3 class="bento-title mt-2">Merge Sort &amp; Quick Sort</h3>
          </div>
          <div class="hero-stat-accent">O(n log n)</div>
        </div>
        <p class="bento-body mt-2">
          Tạo đột phá về hiệu năng với độ phức tạp trung bình <strong>O(n log n)</strong>,
          trong đó <strong>Quick Sort</strong> từ lâu được xem là chuẩn mực tốc độ thực thi trong RAM.
        </p>
      </div>
    </div>

    <div class="bento-grid flex-1 min-h-0">
      <div class="bento-card col-4 bento-item" style="--stagger:2; border-color:rgba(255,69,58,0.38);">
        <span class="badge-pill badge-rose">Góc khuất #1 • Nguy cơ bảo mật</span>
        <h3 class="bento-title mt-2">Nguy cơ của Quick Sort</h3>
        <p class="bento-body mt-2">
          Tiềm ẩn nguy cơ suy thoái về <strong>O(n²)</strong> khi gặp dữ liệu bất lợi (chọn chốt xấu liên tiếp)
          hoặc gây tràn ngăn xếp (<strong>Stack Overflow</strong> <code>O(n)</code>), dễ bị khai thác tấn công DoS.
        </p>
      </div>

      <div class="bento-card col-4 bento-item" style="--stagger:3; border-color:rgba(255,159,10,0.38);">
        <span class="badge-pill badge-amber">Góc khuất #2 • Áp lực bộ nhớ</span>
        <h3 class="bento-title mt-2">Gánh nặng của Merge Sort</h3>
        <p class="bento-body mt-2">
          Đảm bảo ổn định (<strong>Stable</strong>) và cận trên <code>O(n log n)</code>, nhưng tiêu tốn
          bộ nhớ phụ <strong>O(n)</strong>, bất khả thi trên hệ thống nhúng hoặc nhân OS có RAM/Stack hạn hẹp.
        </p>
      </div>

      <div class="bento-card col-4 bento-item" style="--stagger:4; border-color:rgba(90,200,250,0.36);">
        <span class="badge-pill badge-blue">Góc khuất #3 • Dữ liệu đời thực</span>
        <h3 class="bento-title mt-2">Đặc thù dữ liệu Production</h3>
        <p class="bento-body mt-2">
          Dữ liệu thực tế hiếm khi ngẫu nhiên hoàn toàn mà thường có sẵn các đoạn đã được sắp xếp cục bộ
          (<em>natural runs</em>) — như log hệ thống, danh sách giao dịch nối tiếp.
        </p>
      </div>
    </div>

    <div class="bento-grid bento-grid-auto">
      <div class="bento-card bento-card-accent bento-card-auto col-12 bento-item" style="--stagger:5">
        <div class="flex-row justify-between flex-wrap gap-3">
          <h3 class="bento-title">Giải pháp từ các Thư viện Chuẩn &amp; Hệ điều hành (Hybrid Sorting)</h3>
          <span class="badge-pill badge-accent">Tối ưu Phần cứng &amp; Thực tế</span>
        </div>
        <p class="bento-body mt-2">
          <strong style="color:#30D158">Timsort</strong> (khai thác natural runs + ổn định),
          <strong style="color:#BF5AF2">Introsort</strong> (tốc độ RAM + lưới an toàn Heapsort) và
          <strong style="color:#FFD60A">Heap Sort</strong> (chuẩn <code>O(1)</code> RAM tuyệt đối).
        </p>
      </div>
    </div>
  `}function be(){return`
    <div class="bento-grid flex-1 min-h-0">
      <div class="bento-col col-5">
        <div class="bento-card bento-card-accent bento-card-auto bento-item" style="--stagger:0">
          <div class="flex-row justify-between items-center gap-2">
            <span class="badge-pill badge-mint">Tim Peters (2002)</span>
            <span class="bento-caption mono">minrun học tập = 4</span>
          </div>
          <div class="hero-stat-accent mt-2">minrun = 32–64</div>
          <p class="bento-body mt-2">
            <strong>Định nghĩa:</strong> Thuật toán sắp xếp lai kết hợp <strong>Merge Sort</strong> và <strong>Insertion Sort</strong>.
          </p>
        </div>

        <div class="bento-card bento-card-auto bento-item" style="--stagger:1">
          <h3 class="bento-title">Đặc tả Input / Output</h3>
          <p class="bento-body mt-2">
            • <strong>Input:</strong> Mảng <code>n</code> phần tử (số, chuỗi, hoặc Object qua <code>Comparable</code> / <code>Comparator</code> trong Java).<br/>
            • <strong>Ví dụ:</strong> <code>[5, 2, 3, 1, 4]</code> → <code>[1, 2, 3, 4, 5]</code>.
          </p>
        </div>

        <div class="bento-card flex-1 bento-item" style="--stagger:2; border-color:rgba(48,209,88,0.35);">
          <span class="badge-pill badge-mint">Stable Sort (Tính ổn định)</span>
          <p class="bento-body mt-2">
            Các phần tử có khóa bằng nhau (VD: bản ghi nhân viên cùng điểm, đơn hàng cùng ngày)
            <strong>giữ nguyên thứ tự tương đối ban đầu</strong>. Cực kỳ quan trọng khi sắp xếp theo nhiều tiêu chí!
          </p>
        </div>
      </div>

      <div class="col-7 h-full min-h-0">
        <div class="bento-subgrid-2">
          <div class="bento-card bento-item" style="--stagger:3">
            <span class="badge-pill badge-mint">Cơ chế 01</span>
            <h3 class="bento-title mt-2">Natural Runs</h3>
            <p class="bento-body mt-2">
              Quét mảng phát hiện các đoạn liên tiếp đã tăng dần tự nhiên (hoặc giảm dần rồi đảo ngược).
            </p>
          </div>

          <div class="bento-card bento-item" style="--stagger:4">
            <span class="badge-pill badge-blue">Cơ chế 02</span>
            <h3 class="bento-title mt-2">Minrun &amp; Binary Insertion</h3>
            <p class="bento-body mt-2">
              Thực tế <code>minrun = 32–64</code> (tính theo bit từ <code>n</code>). Nếu run ngắn hơn <code>minrun</code>, mở rộng bằng Binary Insertion Sort.
            </p>
          </div>

          <div class="bento-card bento-item" style="--stagger:5">
            <span class="badge-pill badge-blue">Cơ chế 03</span>
            <h3 class="bento-title mt-2">Merge Stack cân bằng</h3>
            <p class="bento-body mt-2">
              Lưu các run vào stack và gộp theo bất biến cân bằng kích thước để tránh cây gộp bị lệch.
            </p>
          </div>

          <div class="bento-card bento-item" style="--stagger:6">
            <span class="badge-pill badge-amber">Cơ chế 04</span>
            <h3 class="bento-title mt-2">Galloping Mode</h3>
            <p class="bento-body mt-2">
              Khi một run liên tục thắng lúc merge, nhảy bước lũy thừa rồi tìm nhị phân để chép cả cụm phần tử cùng lúc.
            </p>
          </div>
        </div>
      </div>
    </div>
  `}function It(){return`Mảng đầu vào A = [${n.timsortArray.join(", ")}] với tham số minrun = ${tt}`}function Ct(t){const e=t.array,s=Math.max(...e,1);return e.map((a,i)=>{const c=t.highlights[i]||"default",r=t.activeIndices.includes(i),p=Math.round(14+a/s*86);return`
        <div class="tim-bar-slot">
          <span class="tim-bar-val val-${c}">${a}</span>
          <div class="tim-bar-track">
            <div class="tim-bar-col bar-${c} ${r?"is-active":""}" style="height:${p}%"></div>
          </div>
          <span class="tim-bar-idx ${r?"is-active":""}">[${i}]</span>
        </div>
      `}).join("")}function Et(t){return!t||t.length===0?'<div class="tim-runs-placeholder">Chưa phân chia Run — thuật toán sẽ tự động tách mảng theo minrun = 4</div>':t.map(e=>{let s="";return e.active?s="run-active":e.label&&e.label.startsWith("Merged")&&(s="run-merged"),`<div class="tim-run-chip ${s}" style="grid-column:${e.start+1} / span ${e.len}" title="${z(e.label)}">${z(e.label)}</div>`}).join("")}function Bt(){return n.timsortPlaying?"<span>⏸</span><span>Tạm dừng</span>":n.timsortStep>=n.timsortFrames.length-1&&n.timsortFrames.length>1?"<span>↻</span><span>Chạy lại</span>":"<span>▶</span><span>Tự động chạy</span>"}function ve(t){const e=[{key:"init",label:"1. Khởi tạo"},{key:"runs",label:"2. Tạo Runs"},{key:"merge",label:"3. Trộn Runs"},{key:"done",label:"4. Hoàn tất"}],s=e.findIndex(a=>a.key===t);return e.map((a,i)=>{const c=i===s?"is-active":i<s?"is-done":"",r=i<e.length-1?'<span class="tim-stage-arrow">→</span>':"";return`<div id="tim-stage-${a.key}" class="tim-stage-pill ${c}">${a.label}</div>${r}`}).join("")}function ye(){const t=n.timsortFrames[n.timsortStep]||n.timsortFrames[0],e=st[t.phase]||st.init,s=nt[n.timsortSpeed]||nt[3];return`
    <div class="bento-grid flex-1 min-h-0">
      <div class="tim-card col-12 bento-item" style="--stagger:0">
        <div class="tim-top-row">
          <div class="tim-title-group">
            <span id="tim-phase-badge" class="tim-phase-badge ${e.badgeClass}">${e.text}</span>
            <h3 id="tim-step-title" class="tim-step-title">${z(t.title)}</h3>
          </div>
          <div class="tim-controls">
            <button id="tim-btn-auto" type="button" class="tim-btn-play" data-action="tim-auto">
              ${Bt()}
            </button>
            <button id="tim-btn-prev" type="button" class="tim-btn" data-action="tim-prev" title="Quay lại 1 bước ([)" ${n.timsortStep===0?"disabled":""}>
              <span>⏮</span><span>Quay lại</span>
            </button>
            <button id="tim-btn-next" type="button" class="tim-btn" data-action="tim-next" title="Bước tiếp theo (])" ${n.timsortStep>=n.timsortFrames.length-1?"disabled":""}>
              <span>Bước tiếp</span><span>⏭</span>
            </button>
            <button id="tim-btn-reset" type="button" class="tim-btn" data-action="tim-reset" title="Đặt lại về mảng mặc định">
              <span>↺</span><span>Đặt lại</span>
            </button>
            <button id="tim-btn-random" type="button" class="tim-btn" data-action="tim-random" title="Tạo mảng ngẫu nhiên 10 phần tử">
              <span>🎲</span><span>Mảng ngẫu nhiên</span>
            </button>
          </div>
        </div>

        <div class="tim-meta-row">
          <div id="tim-stepper" class="tim-stepper" aria-label="Tiến độ giai đoạn">
            ${ve(t.phase)}
          </div>

          <div class="tim-metrics-group">
            <div class="tim-speed-box">
              <span>Chậm</span>
              <input id="tim-speed-slider" class="tim-speed-slider" type="range" min="1" max="5" step="1" value="${n.timsortSpeed}" aria-label="Tốc độ mô phỏng" />
              <span>Nhanh</span>
              <span id="tim-speed-label" class="tim-speed-label">${s.label}</span>
            </div>

            <div class="tim-stat-pill">
              <span>So sánh:</span>
              <span id="tim-stat-cmp" class="tim-stat-val tim-stat-cmp">${t.comparisons}</span>
            </div>
            <div class="tim-stat-pill">
              <span>Ghi/Dịch:</span>
              <span id="tim-stat-writes" class="tim-stat-val tim-stat-writes">${t.writes}</span>
            </div>
            <div class="tim-stat-pill">
              <span>Bước:</span>
              <span id="tim-stat-step" class="tim-stat-val tim-stat-step">${n.timsortStep} / ${n.timsortFrames.length-1}</span>
            </div>
          </div>
        </div>

        <div class="tim-desc-box">
          <p id="tim-step-desc" class="tim-desc-text">${z(t.description)}</p>
        </div>

        <section class="tim-stage-box">
          <div id="tim-bars-container" class="tim-bars-grid" aria-label="Biểu đồ cột các phần tử mảng">
            ${Ct(t)}
          </div>
          <div class="tim-runs-wrap">
            <div id="tim-runs-container" class="tim-runs-grid" aria-label="Nhãn phân nhóm các Run">
              ${Et(t.runs)}
            </div>
          </div>
        </section>

        <footer class="tim-footer">
          <div class="tim-legend">
            <div class="tim-legend-item"><span class="tim-legend-swatch swatch-default"></span><span>Mặc định</span></div>
            <div class="tim-legend-item"><span class="tim-legend-swatch swatch-compare"></span><span>Xét Run / So sánh</span></div>
            <div class="tim-legend-item"><span class="tim-legend-swatch swatch-insert"></span><span>Chèn / Dịch (Insertion Sort)</span></div>
            <div class="tim-legend-item"><span class="tim-legend-swatch swatch-merge"></span><span>Đang trộn (Merge)</span></div>
            <div class="tim-legend-item"><span class="tim-legend-swatch swatch-sorted"></span><span>Đã hoàn thành / Đã sắp xếp</span></div>
          </div>
          <div class="tim-kbd-hint">
            Phím tắt mô phỏng: <kbd>P</kbd> Chạy/Dừng · <kbd>[</kbd> <kbd>]</kbd> Chuyển bước
          </div>
        </footer>
      </div>
    </div>
  `}function ut(){const t=document.getElementById("tim-btn-auto");t&&(t.innerHTML=Bt())}function X(t=!1){const e=n.timsortFrames[n.timsortStep];if(!e)return;const s=document.getElementById("tim-bars-container");if(!s)return;if(t||s.children.length!==e.array.length)s.innerHTML=Ct(e);else{const x=e.array,m=Math.max(...x,1),f=s.children;for(let k=0;k<x.length;k++){const w=f[k],C=x[k],$=e.highlights[k]||"default",E=e.activeIndices.includes(k),I=Math.round(14+C/m*86),v=w.querySelector(".tim-bar-val"),S=w.querySelector(".tim-bar-col"),T=w.querySelector(".tim-bar-idx");v&&(v.textContent=C,v.className=`tim-bar-val val-${$}`),S&&(S.style.height=`${I}%`,S.className=`tim-bar-col bar-${$} ${E?"is-active":""}`),T&&(T.className=`tim-bar-idx ${E?"is-active":""}`)}}const a=document.getElementById("tim-runs-container");a&&(a.innerHTML=Et(e.runs));const i=st[e.phase]||st.init,c=document.getElementById("tim-phase-badge");c&&(c.textContent=i.text,c.className=`tim-phase-badge ${i.badgeClass}`);const r=document.getElementById("tim-step-title");r&&(r.textContent=e.title);const p=document.getElementById("tim-step-desc");p&&(p.textContent=e.description);const d=["init","runs","merge","done"],l=d.indexOf(e.phase);d.forEach((x,m)=>{const f=document.getElementById(`tim-stage-${x}`);f&&(f.className=`tim-stage-pill ${m===l?"is-active":m<l?"is-done":""}`)});const h=document.getElementById("tim-stat-cmp");h&&(h.textContent=e.comparisons);const b=document.getElementById("tim-stat-writes");b&&(b.textContent=e.writes);const u=document.getElementById("tim-stat-step");u&&(u.textContent=`${n.timsortStep} / ${n.timsortFrames.length-1}`);const y=document.getElementById("tim-btn-prev");y&&(y.disabled=n.timsortStep===0);const o=document.getElementById("tim-btn-next");o&&(o.disabled=n.timsortStep>=n.timsortFrames.length-1);const g=document.querySelector(".slide-subtitle");g&&H[n.slideIndex]?.id===4&&(g.textContent=It()),ut()}function _(){n.timsortTimer!==null&&(clearTimeout(n.timsortTimer),n.timsortTimer=null),n.timsortPlaying=!1,ut()}function At(){if(!n.timsortPlaying)return;const t=nt[n.timsortSpeed]?.delay||550;n.timsortTimer=setTimeout(()=>{n.timsortPlaying&&(n.timsortStep<n.timsortFrames.length-1?(n.timsortStep+=1,X(),n.timsortStep>=n.timsortFrames.length-1?_():At()):_())},t)}function Ht(){if(n.timsortPlaying){_();return}n.timsortStep>=n.timsortFrames.length-1&&(n.timsortStep=0,X()),n.timsortPlaying=!0,ut(),n.timsortTimer=setTimeout(()=>{n.timsortPlaying&&(n.timsortStep<n.timsortFrames.length-1?(n.timsortStep+=1,X(),n.timsortStep<n.timsortFrames.length-1?At():_()):_())},120)}function Mt(){_(),n.timsortStep<n.timsortFrames.length-1&&(n.timsortStep+=1,X())}function Nt(){_(),n.timsortStep>0&&(n.timsortStep-=1,X())}function xt(t){_(),n.timsortArray=[...t],n.timsortFrames=wt(t),n.timsortStep=0,X(!0)}function fe(){const t=rt.find(e=>e.id===n.javaTab)||rt[0];return`
    <div class="bento-grid bento-grid-auto">
      <div class="bento-card bento-card-auto col-12 bento-item" style="padding:12px 18px; --stagger:0">
        <div class="flex-row justify-between flex-wrap gap-2">
          <div class="flex-row gap-2 flex-wrap">
            ${rt.map(e=>`
              <button type="button" class="tab-btn ${n.javaTab===e.id?"active":""}" data-action="java-tab" data-tab="${e.id}">
                ${e.label}
              </button>
            `).join("")}
          </div>
          <span class="badge-pill badge-mint">Java 8+ • MIN_RUN = 4</span>
        </div>
      </div>
    </div>

    <div class="bento-grid flex-1 min-h-0">
      <div class="col-7 h-full min-h-0">
        ${V("TimSortDemo.java","java",t.code,1)}
      </div>

      <div class="bento-col col-5">
        <div class="bento-card bento-card-auto bento-item" style="--stagger:2">
          <h3 class="bento-title">Giải thích phương thức đang xem</h3>
          <p class="bento-body mt-2">${t.description}</p>
        </div>

        <div class="bento-card bento-card-auto bento-item" style="--stagger:3">
          <span class="badge-pill badge-mint">Kết quả Console</span>
          <pre class="mono mt-2" style="font-size:var(--fs-code); color:#30D158; background:#0D0D0F; padding:8px 12px; border-radius:14px; border:1px solid rgba(48,209,88,0.28); line-height:1.45;">Input : [3, 5, 7, 2, 4, 6, 9, 1, 8, 10]
Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</pre>
        </div>

        <div class="bento-card bento-card-accent flex-1 bento-item" style="--stagger:4">
          <h3 class="bento-title">Lưu ý kỹ thuật &amp; Tính ổn định</h3>
          <p class="bento-body mt-2">
            • Dùng <code>a[j] &gt; key</code> (thay vì <code>&gt;=</code>) trong <code>insertionSort</code> và <code>a[i] &lt;= a[j]</code> trong <code>merge</code> để giữ nguyên thứ tự các khóa bằng nhau.<br/>
            • Bản sản xuất OpenJDK bổ sung đảo run giảm dần, bất biến merge stack và galloping mode.
          </p>
        </div>
      </div>
    </div>
  `}function xe(){return`
    <div class="bento-grid bento-grid-auto">
      <div class="bento-card bento-card-accent col-4 bento-item" style="--stagger:0">
        <span class="badge-pill badge-mint">Best Case</span>
        <div class="hero-stat-accent mt-2">O(n)</div>
        <p class="bento-body mt-1">1 lượt quét duy nhất trên mảng đã tăng dần.</p>
      </div>

      <div class="bento-card col-4 bento-item" style="--stagger:1">
        <span class="badge-pill badge-blue">Average &amp; Worst Case</span>
        <div class="hero-stat mt-2">O(n log n)</div>
        <p class="bento-body mt-1">Không bao giờ suy biến thành <code>O(n²)</code>.</p>
      </div>

      <div class="bento-card col-4 bento-item" style="--stagger:2">
        <span class="badge-pill badge-amber">Space Complexity</span>
        <div class="hero-stat mt-2">O(n)</div>
        <p class="bento-body mt-1">Bộ nhớ phụ cho vùng đệm tạm &amp; run stack.</p>
      </div>
    </div>

    <div class="bento-grid flex-1 min-h-0">
      <div class="bento-card col-7 bento-item" style="--stagger:3">
        <h3 class="bento-title">Bảng Độ phức tạp Thời gian (Time Complexity)</h3>
        <table class="data-table mt-2">
          <thead>
            <tr>
              <th>Trường hợp</th>
              <th>Độ phức tạp</th>
              <th>Cơ chế &amp; Tình huống ví dụ</th>
            </tr>
          </thead>
          <tbody>
            <tr class="row-highlight">
              <td class="font-bold">Tốt nhất (Best)</td>
              <td class="mono font-bold" style="color:#30D158">O(n)</td>
              <td>Mảng đã tăng dần, chỉ quét 1 lượt phát hiện 1 run duy nhất, không cần merge (VD: danh sách giao dịch theo thời gian).</td>
            </tr>
            <tr>
              <td class="font-bold">Trung bình (Avg)</td>
              <td class="mono font-bold" style="color:#64D2FF">O(n log n)</td>
              <td>Dữ liệu ngẫu nhiên hoặc bán sắp xếp, gộp qua khoảng <code>~log n</code> tầng; các run dài giúp giảm mạnh số lần gộp.</td>
            </tr>
            <tr>
              <td class="font-bold">Xấu nhất (Worst)</td>
              <td class="mono font-bold" style="color:#FFD60A">O(n log n)</td>
              <td>Dữ liệu đảo lộn tạo nhiều run ngắn, nhưng không bao giờ suy biến thành <code>O(n²)</code> nhờ quy tắc quản lý run.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bento-col col-5">
        <div class="bento-card flex-1 bento-item" style="--stagger:4">
          <h3 class="bento-title">Vùng đệm tạm &amp; Run Stack</h3>
          <p class="bento-body mt-2">
            • Tốn <strong>O(n)</strong> bộ nhớ phụ trong trường hợp xấu nhất cho vùng đệm tạm (<em>temporary buffer</em>) khi trộn hai run lớn và <code>run stack</code>.<br/>
            • Bản Java minh họa dùng <code>runStart</code> và <code>runEnd</code> kích thước <code>n</code> để dễ quan sát cấu trúc.
          </p>
        </div>

        <div class="bento-card bento-card-accent flex-1 bento-item" style="--stagger:5">
          <h3 class="bento-title">Timsort vs Dual-Pivot Quicksort</h3>
          <p class="bento-body mt-2">
            Chấp nhận tốn RAM <strong>O(n)</strong> (khác với Dual-Pivot Quicksort dùng cho kiểu nguyên thủy trong Java) để đổi lấy
            <strong>tính ổn định (Stability)</strong> và tốc độ cực cao trên dữ liệu thực tế gần có thứ tự.
          </p>
        </div>
      </div>
    </div>
  `}function ke(){return`
    <div class="bento-grid bento-grid-auto">
      <div class="bento-card bento-card-accent bento-card-auto col-12 bento-item" style="--stagger:0">
        <div class="flex-row justify-between flex-wrap gap-2">
          <h3 class="bento-title">1. Hệ sinh thái Ngôn ngữ Lập trình &amp; Runtime</h3>
          <div class="flex-row gap-2 flex-wrap">
            <span class="badge-pill badge-mint">Python sort() / sorted()</span>
            <span class="badge-pill badge-blue">Java Arrays.sort(Object[])</span>
            <span class="badge-pill badge-mint">V8 JS Engine</span>
            <span class="badge-pill badge-blue">Android</span>
          </div>
        </div>
        <p class="bento-body mt-2">
          Thuật toán sắp xếp mặc định trong <strong>Python</strong> (<code>sort()</code>, <code>sorted()</code>),
          <strong>Java</strong> (<code>Arrays.sort(Object[])</code>, <code>Collections.sort()</code>),
          <strong>Android</strong> và <strong>V8 JavaScript Engine</strong> (Chrome, Node.js).
        </p>
      </div>
    </div>

    <div class="bento-grid flex-1 min-h-0">
      <div class="bento-col col-6">
        <div class="bento-card bento-card-auto bento-item" style="--stagger:1">
          <span class="badge-pill badge-mint">2. Hệ thống thu thập Server Logs</span>
          <p class="bento-body mt-2">
            Ghép log từ nhiều máy chủ bị lệch nhẹ timestamp do độ trễ mạng tạo thành nhiều run gần tăng dần.
            Timsort nhận diện nhanh và giữ nguyên thứ tự các log trùng timestamp.
          </p>
        </div>
        ${V("ServerLogSort.java","java",`class LogEntry {
    final Instant timestamp;
    final String message;
    LogEntry(Instant timestamp, String message) {
        this.timestamp = timestamp;
        this.message = message;
    }
}
// Ghép log từ nhiều máy chủ lệch nhẹ timestamp -> nhiều run gần tăng dần:
logs.sort(Comparator.comparing(entry -> entry.timestamp));`,2)}
      </div>

      <div class="bento-col col-6">
        <div class="bento-card bento-card-auto bento-item" style="--stagger:3">
          <span class="badge-pill badge-blue">3. Liên hệ LeetCode 88 — Merge Sorted Array</span>
          <p class="bento-body mt-2">
            Tư tưởng tận dụng các đoạn đã có thứ tự thay vì sắp xếp lại từ đầu và trộn bằng 2 con trỏ trong thời gian tuyến tính <code>O(m + n)</code>.
          </p>
        </div>
        ${V("MergeSortedRuns.java","java",`// Liên hệ LeetCode 88 (Merge Sorted Array): Gộp 2 run đã sắp xếp trong O(m + n)
static int[] mergeSortedArrays(int[] a, int[] b) {
    int[] out = new int[a.length + b.length];
    int i = 0, j = 0, k = 0;
    while (i < a.length && j < b.length)
        out[k++] = (a[i] <= b[j]) ? a[i++] : b[j++];
    while (i < a.length) out[k++] = a[i++];
    while (j < b.length) out[k++] = b[j++];
    return out;
}`,4)}
      </div>
    </div>
  `}function Se(){return`
    <div class="bento-grid bento-grid-auto">
      <div class="bento-card col-8 bento-item" style="--stagger:0">
        <div class="flex-row justify-between flex-wrap gap-2">
          <span class="badge-pill badge-purple">David R. Musser (1997) — Bảo vệ std::sort của C++ STL</span>
          <span class="mono bento-caption" style="color:#DF9EFF">Ví dụ: [19, 7, 15, 12, 16, 18, 4, 11, 13] → [4..19]</span>
        </div>
        <p class="bento-body mt-2">
          <strong>Đặc tả bài toán:</strong> Sắp xếp mảng dựa trên phép so sánh tại chỗ (<em>In-place comparison sort</em>) — vừa đạt tốc độ thực thi trung bình nhanh như Quicksort, vừa khóa chặt thời gian xấu nhất ở mức <strong>O(n log n)</strong>.
        </p>
      </div>

      <div class="bento-card bento-card-accent col-4 bento-item" style="--stagger:1">
        <span class="badge-pill badge-purple">Kiến trúc Lai</span>
        <div class="hero-stat-accent mt-1">3-in-1</div>
        <p class="bento-body mt-1"><code>depth = 2⌊log₂ n⌋</code> • <code>size ≤ 16</code></p>
      </div>
    </div>

    <div class="bento-grid flex-1 min-h-0">
      <div class="bento-card col-6 bento-item justify-between" style="--stagger:2">
        <h3 class="bento-title">Tại sao không dùng 1 thuật toán đơn lẻ?</h3>
        <div class="flex-col gap-2 mt-2 flex-1 justify-between">
          <div class="bento-subtile">
            <p class="bento-body"><strong style="color:#FF6961">1. Chỉ dùng Quicksort:</strong> Trung bình rất nhanh nhưng suy biến <code>O(n²)</code> và tràn stack <code>O(n)</code> khi chọn chốt xấu.</p>
          </div>
          <div class="bento-subtile">
            <p class="bento-body"><strong style="color:#FFD60A">2. Chỉ dùng Heapsort:</strong> Luôn <code>O(n log n)</code> và <code>O(1)</code> RAM, nhưng nhảy bộ nhớ liên tục gây <strong>Cache Miss</strong>, chậm hơn Quicksort 2–3 lần.</p>
          </div>
          <div class="bento-subtile">
            <p class="bento-body"><strong style="color:#64D2FF">3. Không có Insertion Sort:</strong> Quicksort gọi đệ quy tới đoạn 1–2 phần tử → lãng phí tới <strong>75% tổng số lời gọi hàm</strong> ở đáy cây đệ quy.</p>
          </div>
        </div>
      </div>

      <div class="bento-card col-6 bento-item justify-between" style="--stagger:3">
        <h3 class="bento-title">3 Trụ cột của Introsort</h3>
        <div class="flex-col gap-2 mt-2 flex-1 justify-between">
          <div class="bento-subtile" style="border-color:rgba(94,92,230,0.45);">
            <p class="bento-body"><strong style="color:#5AC8FA">1. Quicksort (Chủ lực):</strong> Khi <code>size &gt; 16</code> và <code>depth &gt; 0</code>. Dùng chốt <em>Median-of-Three</em>, duyệt tuần tự thân thiện L1/L2 CPU Cache.</p>
          </div>
          <div class="bento-subtile" style="border-color:rgba(191,90,242,0.5);">
            <p class="bento-body"><strong style="color:#BF5AF2">2. Heapsort (Lưới an toàn):</strong> Khi <code>size &gt; 16</code> và <code>depth == 0</code>. Vun đống tại chỗ ngay trên đoạn con bị lệch, khóa chặt cận trên <code>O(n log n)</code>.</p>
          </div>
          <div class="bento-subtile" style="border-color:rgba(48,209,88,0.45);">
            <p class="bento-body"><strong style="color:#30D158">3. Insertion Sort (Đoạn nhỏ):</strong> Khi <code>size &lt;= 16</code>. Triệt tiêu chi phí gọi hàm đệ quy (<em>recursion overhead</em>) ở đáy cây.</p>
          </div>
        </div>
      </div>
    </div>
  `}function we(){return`
    <div class="bento-grid flex-1 min-h-0">
      <div class="bento-col col-4">
        <div class="bento-card bento-card-accent bento-card-auto bento-item" style="--stagger:0">
          <span class="badge-pill badge-purple">Ngân sách độ sâu gốc</span>
          <div class="hero-stat-accent mt-2">2⌊log₂ n⌋</div>
          <p class="bento-body mt-2"><code>depth_limit = 2 * floor(log2(n))</code></p>
        </div>

        <div class="bento-card bento-card-auto bento-item" style="--stagger:1">
          <span class="badge-pill badge-mint">Ngưỡng đoạn nhỏ</span>
          <div class="hero-stat mt-2">size ≤ 16</div>
          <p class="bento-body mt-2">Chuyển sang Insertion Sort trực tiếp, triệt tiêu chi phí đệ quy.</p>
        </div>

        <div class="bento-card flex-1 bento-item" style="--stagger:2">
          <h3 class="bento-title">Khử đệ quy đuôi</h3>
          <p class="bento-body mt-2">
            Đệ quy nửa phải <code>[p + 1 .. high]</code>, rồi gán <code>high = p - 1</code> lặp <code>while</code> cho nửa trái với <code>depth_limit - 1</code>.
          </p>
        </div>
      </div>

      <div class="bento-card col-8 bento-item" style="--stagger:3">
        <div class="flex-row justify-between flex-wrap gap-2">
          <h3 class="bento-title">Lưu đồ điều phối <code>_introsort_util(low, high, depth_limit)</code></h3>
          <span class="badge-pill badge-purple">3 Nhánh Rẽ Cốt Lõi</span>
        </div>

        <div class="flex-1 min-h-0 flex items-center justify-center mt-2">
          <svg viewBox="0 0 980 370" style="width:100%; height:100%; max-height:100%;">
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#A1A1A6" />
              </marker>
              <marker id="arrow-mint" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#30D158" />
              </marker>
              <marker id="arrow-purple" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#BF5AF2" />
              </marker>
            </defs>

            <rect x="20" y="16" width="310" height="66" rx="16" fill="#0D0D0F" stroke="#5E5CE6" stroke-width="2" />
            <text x="175" y="43" text-anchor="middle" fill="#F5F5F7" font-size="14" font-weight="700">Bắt đầu _introsort_util(low, high, depth)</text>
            <text x="175" y="65" text-anchor="middle" fill="#A1A1A6" font-size="13">Tính size = high - low + 1</text>

            <line x1="175" y1="82" x2="175" y2="112" stroke="#A1A1A6" stroke-width="2" marker-end="url(#arrow)" />

            <rect x="20" y="114" width="310" height="66" rx="16" fill="rgba(48,209,88,0.12)" stroke="#30D158" stroke-width="2" />
            <text x="175" y="141" text-anchor="middle" fill="#30D158" font-size="14" font-weight="700">Bước 1: Kiểm tra đoạn nhỏ</text>
            <text x="175" y="163" text-anchor="middle" fill="#F5F5F7" font-size="13">size &lt;= 16 (THRESHOLD) ?</text>

            <line x1="330" y1="147" x2="432" y2="147" stroke="#30D158" stroke-width="2" marker-end="url(#arrow-mint)" />
            <text x="381" y="137" text-anchor="middle" fill="#30D158" font-size="12" font-weight="700">ĐÚNG</text>

            <rect x="436" y="114" width="524" height="66" rx="16" fill="rgba(48,209,88,0.18)" stroke="#30D158" stroke-width="2" />
            <text x="698" y="141" text-anchor="middle" fill="#F5F5F7" font-size="14" font-weight="700">Insertion Sort đoạn [low..high] &amp; RETURN</text>
            <text x="698" y="163" text-anchor="middle" fill="#A7F3D0" font-size="13">Chèn trực tiếp, triệt tiêu chi phí gọi hàm đệ quy ở đáy cây</text>

            <line x1="175" y1="180" x2="175" y2="210" stroke="#A1A1A6" stroke-width="2" marker-end="url(#arrow)" />
            <text x="195" y="199" fill="#A1A1A6" font-size="12" font-weight="700">SAI</text>

            <rect x="20" y="212" width="310" height="66" rx="16" fill="rgba(191,90,242,0.14)" stroke="#BF5AF2" stroke-width="2" />
            <text x="175" y="239" text-anchor="middle" fill="#BF5AF2" font-size="14" font-weight="700">Bước 2: Kiểm tra ngân sách độ sâu</text>
            <text x="175" y="261" text-anchor="middle" fill="#F5F5F7" font-size="13">depth_limit == 0 ?</text>

            <line x1="330" y1="245" x2="432" y2="245" stroke="#BF5AF2" stroke-width="2" marker-end="url(#arrow-purple)" />
            <text x="381" y="235" text-anchor="middle" fill="#BF5AF2" font-size="12" font-weight="700">ĐÚNG</text>

            <rect x="436" y="212" width="524" height="66" rx="16" fill="rgba(191,90,242,0.22)" stroke="#BF5AF2" stroke-width="2" />
            <text x="698" y="239" text-anchor="middle" fill="#F5F5F7" font-size="14" font-weight="700">Heapsort đoạn con [low..high] &amp; RETURN</text>
            <text x="698" y="261" text-anchor="middle" fill="#E9D5FF" font-size="13">Vun đống tại chỗ bằng offset = low, khóa chặt cận O(n log n)</text>

            <line x1="175" y1="278" x2="175" y2="304" stroke="#A1A1A6" stroke-width="2" marker-end="url(#arrow)" />
            <text x="195" y="295" fill="#A1A1A6" font-size="12" font-weight="700">SAI</text>

            <rect x="20" y="306" width="940" height="54" rx="16" fill="rgba(41,151,255,0.16)" stroke="#2997FF" stroke-width="2" />
            <text x="490" y="329" text-anchor="middle" fill="#F5F5F7" font-size="14" font-weight="700">Bước 3 (Phân hoạch chuẩn Quicksort): p = partition_median_of_three(arr, low, high)</text>
            <text x="490" y="349" text-anchor="middle" fill="#5AC8FA" font-size="13">Đệ quy nửa phải [p + 1 .. high] với (depth_limit - 1)  •  Khử đệ quy đuôi nửa trái: high = p - 1</text>
          </svg>
        </div>
      </div>
    </div>
  `}function L(){return ft[n.introTab]||ft.tab1}function it(){const t=L();return t.steps[n.introStep]||t.steps[0]}function Rt(){const t=Math.round(620/n.introSpeed);document.documentElement.style.setProperty("--intro-anim-ms",`${t}ms`);const e=document.getElementById("intro-speed-label");e&&(e.textContent=`${n.introSpeed.toFixed(n.introSpeed%1===0?1:2)}x`)}function Te(){const t=`${n.introSpeed.toFixed(n.introSpeed%1===0?1:2)}x`;return`
    <div class="bento-grid flex-1 min-h-0">
      <div id="intro-sim-root" class="intro-card col-12 bento-item" style="--stagger:0">
        <div class="intro-top-bar">
          <div id="intro-tabs-wrap" class="intro-tabs-wrap" role="tablist" aria-label="Chọn kịch bản Introsort">
            <div id="intro-tab-pill" class="pill-tab1"></div>
            <button id="intro-tab1-btn" type="button" role="tab" aria-selected="true" class="intro-tab-btn active-tab1" data-action="intro-tab" data-tab="tab1">
              Tab 1: Trường hợp chuẩn (threshold=3, depth=6)
            </button>
            <button id="intro-tab2-btn" type="button" role="tab" aria-selected="false" class="intro-tab-btn" data-action="intro-tab" data-tab="tab2">
              Tab 2: Kích hoạt Heapsort (threshold=2, depth=1)
            </button>
          </div>

          <div class="intro-controls">
            <button id="intro-btn-auto" type="button" class="intro-btn-play" data-action="intro-auto">
              <span>▶</span><span>Tự động chạy</span>
            </button>
            <button id="intro-btn-prev" type="button" class="intro-btn" data-action="intro-prev" title="Quay lại ([)">
              <span>⏮</span><span>Quay lại</span>
            </button>
            <button id="intro-btn-next" type="button" class="intro-btn" data-action="intro-next" title="Bước tiếp (])">
              <span>Bước tiếp</span><span>⏭</span>
            </button>
            <button id="intro-btn-reset" type="button" class="intro-btn" data-action="intro-reset" title="Đặt lại về Bước 0">
              <span>↺</span><span>Đặt lại</span>
            </button>
            <div class="intro-speed-box">
              <span>Tốc độ</span>
              <input id="intro-speed-slider" class="intro-speed-slider" type="range" min="0.5" max="2.5" step="0.25" value="${n.introSpeed}" aria-label="Tốc độ mô phỏng" />
              <span id="intro-speed-label" class="intro-speed-label">${t}</span>
            </div>
          </div>
        </div>

        <section class="intro-top-grid">
          <div class="intro-array-panel">
            <div class="intro-array-header">
              <div class="flex-row gap-2">
                <span class="intro-array-title">Mảng A[0..8]</span>
                <span id="intro-active-range" class="intro-range-pill">Đang xét: toàn mảng [0..8]</span>
              </div>
              <div class="intro-inline-key">
                <span class="intro-key-item"><span class="intro-key-dot" style="background:#a855f7"></span>Nửa trái</span>
                <span class="intro-key-item"><span class="intro-key-dot" style="background:#f43f5e"></span>Pivot</span>
                <span class="intro-key-item"><span class="intro-key-dot" style="background:#0ea5e9"></span>Nửa phải</span>
                <span class="intro-key-item"><span class="intro-key-dot" style="background:#f97316"></span>Heapsort</span>
                <span class="intro-key-item"><span class="intro-key-dot" style="background:#22c55e"></span>Đã chốt ✓</span>
              </div>
            </div>

            <div class="intro-tiles-stage">
              <div id="intro-array-track" class="intro-array-track">
                <div id="intro-group-left" class="intro-group-bar intro-group-left">
                  <span class="intro-group-label" style="left:8px; color:#d8b4fe;">Nửa trái</span>
                </div>
                <div id="intro-group-right" class="intro-group-bar intro-group-right">
                  <span class="intro-group-label" style="right:8px; color:#7dd3fc;">Nửa phải</span>
                </div>
                <div id="intro-group-active" class="intro-group-bar">
                  <span id="intro-group-active-label" class="intro-group-label" style="left:8px;">Đang xử lý</span>
                </div>
                <div id="intro-tiles-layer" class="intro-tiles-layer"></div>
              </div>
              <div id="intro-index-row" class="intro-index-row"></div>
            </div>
          </div>

          <div id="intro-explain-box" class="intro-explain-panel box-init">
            <div class="intro-explain-meta">
              <div class="flex-row gap-2 flex-wrap">
                <span id="intro-step-badge" class="intro-step-badge">Bước 0</span>
                <span id="intro-meta-range" class="intro-meta-range">[0..8] (size=9)</span>
                <span style="color:#52525b">•</span>
                <span id="intro-meta-depth" class="intro-meta-depth">depth=6</span>
              </div>
              <span id="intro-algo-badge" class="intro-algo-badge badge-init">Khởi tạo</span>
            </div>

            <div class="intro-desc-wrap">
              <p id="intro-step-desc" class="intro-desc-text"></p>
            </div>

            <div class="intro-explain-footer">
              <span id="intro-step-progress" class="mono">Trạng thái 0 / 7</span>
              <span>Bấm vào node trên cây để nhảy đến bước tương ứng</span>
            </div>
          </div>
        </section>

        <section class="intro-center-panel">
          <div class="intro-center-header">
            <div class="flex-row gap-2">
              <h3 class="intro-center-title">Cây đệ quy phân hoạch &amp; Thước đo Depth</h3>
              <span class="intro-center-sub">Độ sâu đếm ngược từ trên xuống</span>
            </div>
            <div class="intro-algo-legend">
              <span class="intro-key-item"><span class="intro-legend-dot" style="background:#a855f7"></span>Quicksort</span>
              <span class="intro-key-item"><span class="intro-legend-dot" style="background:#22c55e"></span>Insertion Sort</span>
              <span class="intro-key-item"><span class="intro-legend-dot" style="background:#f97316"></span>Heapsort (Depth = 0)</span>
            </div>
          </div>

          <div class="intro-center-row">
            <div id="intro-tree-main" class="intro-tree-main">
              <div id="intro-depth-ruler" class="intro-depth-ruler" aria-label="Thước đo độ sâu Depth">
                <div class="intro-depth-track">
                  <div id="intro-depth-fill" style="height:12%; background:linear-gradient(180deg, #a855f7, #818cf8);"></div>
                </div>
                <div id="intro-depth-pointer"></div>
                <div id="intro-depth-ticks" class="intro-depth-ticks"></div>
              </div>

              <div id="intro-tree-canvas" class="intro-tree-canvas" aria-label="Sơ đồ cây đệ quy Introsort">
                <div id="intro-guide-lines" class="intro-guide-lines"></div>
                <svg id="intro-tree-svg" xmlns="http://www.w3.org/2000/svg"></svg>
                <div id="intro-active-ring"></div>
                <div id="intro-tree-nodes" class="intro-tree-nodes"></div>
              </div>
            </div>

            <aside id="intro-heap-panel" aria-label="Minh họa cây nhị phân Max-Heap">
              <div class="intro-heap-card">
                <div class="intro-heap-header">
                  <div>
                    <div id="intro-heap-title" class="intro-heap-title">Build Max-Heap [0..5]</div>
                    <div id="intro-heap-sub" class="intro-heap-sub">Kích hoạt khi chạm Depth = 0</div>
                  </div>
                  <span id="intro-heap-badge" class="intro-heap-badge">Max-Heap</span>
                </div>

                <div class="intro-heap-stage-wrap">
                  <div class="intro-heap-stage">
                    <svg id="intro-heap-svg" viewBox="0 0 280 184" xmlns="http://www.w3.org/2000/svg"></svg>
                    <div id="intro-heap-nodes" class="intro-heap-nodes"></div>
                  </div>
                </div>

                <div id="intro-heap-note" class="intro-heap-note"></div>
              </div>
            </aside>
          </div>
        </section>

        <footer class="intro-footer">
          <span>Introsort kết hợp Quicksort (nhanh trung bình) + Insertion Sort (mảng nhỏ) + Heapsort (bảo vệ tránh O(n²)).</span>
          <span>Phím tắt mô phỏng: <kbd>P</kbd> Chạy/Dừng · <kbd>[</kbd> <kbd>]</kbd> Chuyển bước · <kbd>1</kbd> <kbd>2</kbd> Đổi Tab</span>
        </footer>
      </div>
    </div>
  `}function $e(){const t=document.getElementById("intro-tiles-layer"),e=document.getElementById("intro-index-row");if(!(!t||!e)){t.innerHTML="",e.innerHTML="",n.introTileEls.clear(),n.introIndexEls=[],n.introPrevIndexMap.clear(),ce.forEach((s,a)=>{const i=document.createElement("div");i.className="intro-tile-outer",i.dataset.val=String(s);const c=document.createElement("div");c.className="intro-tile-inner tile-default";const r=document.createElement("span");r.className="intro-tile-tag";const p=document.createElement("span");p.className="intro-tile-check",p.textContent="✓";const d=document.createElement("span");d.textContent=String(s),c.appendChild(r),c.appendChild(p),c.appendChild(d),i.appendChild(c),t.appendChild(i),n.introTileEls.set(s,{outer:i,inner:c,tagEl:r,checkEl:p}),n.introPrevIndexMap.set(s,a)});for(let s=0;s<9;s++){const a=document.createElement("div");a.className="intro-index-cell",a.textContent=`[${s}]`,e.appendChild(a),n.introIndexEls.push(a)}}}function Ie(){const t=document.getElementById("intro-heap-svg"),e=document.getElementById("intro-heap-nodes");!t||!e||(t.innerHTML="",e.innerHTML="",n.introHeapNodeEls.clear(),n.introHeapEdgeEls=[],he.forEach(([s,a])=>{const i=document.createElementNS("http://www.w3.org/2000/svg","line");i.setAttribute("x1",G[s].x),i.setAttribute("y1",G[s].y),i.setAttribute("x2",G[a].x),i.setAttribute("y2",G[a].y),i.setAttribute("stroke","#f97316"),i.setAttribute("stroke-width","2"),i.setAttribute("opacity","0.65"),i.style.transition="stroke 360ms ease, opacity 360ms ease",t.appendChild(i),n.introHeapEdgeEls.push(i)}),de.forEach((s,a)=>{const i=document.createElement("div");i.className="intro-heap-circle",i.innerHTML=`
      <span>${s}</span>
      <span class="intro-heap-idx-tag">[${a}]</span>
    `;const{x:c,y:r}=G[a];i.style.transform=`translate3d(${c}px, ${r}px, 0)`,e.appendChild(i),n.introHeapNodeEls.set(s,i)}))}function Lt(){const t=document.getElementById("intro-array-track");if(!t)return{trackW:0,gap:8,slotW:0};const e=t.clientWidth,s=8,a=(e-s*8)/9;return{trackW:e,gap:s,slotW:a}}function R(t,e,s,a=""){if(!t)return;if(!s||!e){t.style.opacity="0";return}const{gap:i,slotW:c}=Lt();if(c<=0)return;const[r,p]=e,d=r*(c+i)-4,l=(p-r+1)*c+(p-r)*i+8;t.style.transform=`translate3d(${d}px, 0, 0)`,t.style.width=`${l}px`,t.style.opacity="1",a&&(t.className=`intro-group-bar ${a}`)}function dt(){const t=document.getElementById("intro-tab1-btn"),e=document.getElementById("intro-tab2-btn"),s=document.getElementById("intro-tab-pill");if(!t||!e||!s)return;const a=n.introTab==="tab1",i=a?t:e;t.setAttribute("aria-selected",String(a)),e.setAttribute("aria-selected",String(!a)),t.className=`intro-tab-btn ${a?"active-tab1":""}`,e.className=`intro-tab-btn ${a?"":"active-tab2"}`,s.style.transform=`translate3d(${i.offsetLeft}px, 0, 0)`,s.style.width=`${i.offsetWidth}px`,s.className=a?"pill-tab1":"pill-tab2"}function ht(t,e=!0){const{gap:s,slotW:a}=Lt();if(a<=0)return;const[i,c]=t.range,r=document.getElementById("intro-active-range");r&&(r.textContent=t.step===0?"Đang xét: toàn mảng [0..8]":`Đang xét: [${i}..${c}] (size = ${t.size})`);const p=document.getElementById("intro-group-left"),d=document.getElementById("intro-group-right"),l=document.getElementById("intro-group-active"),h=document.getElementById("intro-group-active-label");if(t.algoType==="quick"&&t.leftRange&&t.rightRange)R(p,t.leftRange,!0),R(d,t.rightRange,!0),R(l,null,!1);else if(t.algoType==="insertion")R(p,null,!1),R(d,null,!1),h&&(h.textContent="Insertion Sort",h.style.color="#86efac"),R(l,t.range,!0,"intro-group-insertion");else if(t.algoType==="heap"){R(p,null,!1),R(d,null,!1);const u=t.step===4;h&&(h.textContent=u?"Heapsort Hoàn tất":"Max-Heap [0..5]",h.style.color=u?"#86efac":"#fdba74"),R(l,t.range,!0,u?"intro-group-insertion":"intro-group-heap")}else R(p,null,!1),R(d,null,!1),R(l,null,!1);const b=(u,y)=>Array.isArray(y)&&u>=y[0]&&u<=y[1];t.array.forEach((u,y)=>{const o=n.introTileEls.get(u);if(!o)return;const g=n.introPrevIndexMap.get(u),x=e&&g!==void 0&&g!==y,m=g!==void 0?Math.abs(y-g):0,f=y*(a+s);o.outer.style.width=`${a}px`,o.outer.style.transform=`translate3d(${f}px, 0, 0)`,o.outer.style.zIndex=x?m>2?"30":"25":"10",o.inner.classList.remove("intro-arc-high","intro-arc-low"),x&&o.inner.offsetWidth;const k=t.step>0&&y>=i&&y<=c,w=t.pivotIndex===y,C=b(y,t.leftRange),$=b(y,t.rightRange),E=t.step===3&&b(y,t.heapRange),I=t.sortedIndices.includes(y);let v="tile-default",S="",T="";w?(v="tile-pivot",S=`Pivot p=${y}`,T="#fda4af",o.outer.style.zIndex="35"):E?(v=y===0?"tile-heap-max":"tile-heap",y===0&&(S="Max",T="#fdba74")):C?v="tile-left":$?v="tile-right":I&&k?v="tile-sorted-active":I&&(v="tile-sorted"),o.inner.className=`intro-tile-inner ${v} ${x?m>=2?"intro-arc-high":"intro-arc-low":""}`,S?(o.tagEl.textContent=S,o.tagEl.style.color=T,o.tagEl.className="intro-tile-tag is-visible"):o.tagEl.className="intro-tile-tag",o.checkEl.style.opacity=I&&!w?"1":"0",n.introPrevIndexMap.set(u,y)}),n.introIndexEls.forEach((u,y)=>{const o=t.step>0&&y>=i&&y<=c;u.className=`intro-index-cell ${o?"is-active":""}`})}function Ce(t,e){const s=document.getElementById("intro-step-badge"),a=document.getElementById("intro-meta-range"),i=document.getElementById("intro-meta-depth"),c=document.getElementById("intro-algo-badge"),r=document.getElementById("intro-explain-box"),p=document.getElementById("intro-step-desc"),d=document.getElementById("intro-step-progress");s&&(s.textContent=`Bước ${t.step}`),a&&(a.textContent=`[${t.range[0]}..${t.range[1]}] (size=${t.size})`),i&&(i.textContent=`depth=${t.depth}`,i.className=`intro-meta-depth ${t.depth===0?"is-zero":""}`),c&&(c.textContent=t.algo,c.className=`intro-algo-badge badge-${t.algoType}`),r&&(r.className=`intro-explain-panel box-${t.algoType}`),p&&(p.classList.remove("intro-fade-slide-in"),p.offsetWidth,p.textContent=t.description,p.classList.add("intro-fade-slide-in")),d&&(d.textContent=`Trạng thái ${t.step} / ${e.steps.length-1}`)}function at(t){const e=document.getElementById("intro-tree-canvas"),s=document.getElementById("intro-tree-svg");if(!e||!s)return;const a=e.getBoundingClientRect();a.width===0||a.height===0||(s.setAttribute("viewBox",`0 0 ${a.width} ${a.height}`),s.innerHTML="",n.introTreeEdgeEls=[],t.edges.forEach(i=>{const c=n.introTreeNodeEls.get(i.from),r=n.introTreeNodeEls.get(i.to);if(!c||!r)return;const p=c.el.getBoundingClientRect(),d=r.el.getBoundingClientRect(),l=p.left-a.left+p.width/2,h=p.bottom-a.top,b=d.left-a.left+d.width/2,u=d.top-a.top,y=h+(u-h)*.52,o=`M ${l} ${h} C ${l} ${y}, ${b} ${y}, ${b} ${u}`,g=document.createElementNS("http://www.w3.org/2000/svg","path");g.setAttribute("d",o),g.setAttribute("fill","none"),g.setAttribute("stroke","#272c3d"),g.setAttribute("stroke-width","1.4"),g.setAttribute("stroke-dasharray","4 4"),g.setAttribute("opacity","0.55"),s.appendChild(g);const x=document.createElementNS("http://www.w3.org/2000/svg","path");x.setAttribute("d",o),x.setAttribute("fill","none"),x.setAttribute("stroke-width","2.4"),x.setAttribute("stroke-linecap","round"),x.setAttribute("class","intro-edge-path"),s.appendChild(x);const m=x.getTotalLength();x.style.strokeDasharray=`${m}`,x.style.strokeDashoffset=`${m}`;const f=(l+b)/2+(i.branch==="left"?-20:20),k=(h+u)/2-2,w=document.createElementNS("http://www.w3.org/2000/svg","text");w.setAttribute("x",f),w.setAttribute("y",k),w.setAttribute("text-anchor","middle"),w.setAttribute("font-size","10"),w.setAttribute("font-weight","600"),w.setAttribute("class","intro-edge-label"),w.textContent=i.label,s.appendChild(w),n.introTreeEdgeEls.push({edge:i,pathEl:x,labelEl:w,length:m})}),Pt(t,it()))}function Ot(t){const e=document.getElementById("intro-tree-main"),s=document.getElementById("intro-tree-canvas"),a=document.getElementById("intro-depth-ticks"),i=document.getElementById("intro-guide-lines"),c=document.getElementById("intro-tree-nodes");!e||!s||!a||!i||!c||(a.innerHTML="",i.innerHTML="",c.innerHTML="",n.introTreeNodeEls.clear(),t.depthRows.forEach((r,p)=>{const d=t.rowCentersPct[p],l=document.createElement("div");l.style.top=`${d}%`,l.className="intro-depth-tick",r.isDanger?l.innerHTML=`
        <span style="font-size:11px; font-weight:800; color:#fb7185;">${r.label}</span>
        <span style="font-size:9px; font-weight:600; color:rgba(251,113,133,0.8);">${r.sub}</span>
      `:l.innerHTML=`
        <span style="font-size:11px; font-weight:700; color:#d4d4d8;">${r.label}</span>
        <span style="font-size:9px; color:#71717a;">${r.sub}</span>
      `,a.appendChild(l);const h=document.createElement("div");h.style.top=`${d}%`,r.isDanger?(h.className="intro-guide-line is-danger",h.innerHTML=`
        <span class="intro-danger-tag">
          ${r.isCompactWarning?"⚠ Depth = 0 (Kích hoạt Heapsort — Chưa chạm tới)":"⚠ Depth = 0 (Kích hoạt Heapsort nếu size > 2)"}
        </span>
      `):h.className="intro-guide-line",i.appendChild(h)}),t.nodes.forEach(r=>{const p=t.rowCentersPct[r.rowIndex],d=document.createElement("div");d.dataset.nodeId=r.id,d.style.left=`${r.xPercent}%`,d.style.top=`${p}%`,d.setAttribute("role","button"),d.setAttribute("tabindex","0");let l="";r.extraStep!==void 0&&(l=`
        <div class="intro-heap-subpills">
          <button type="button" data-action="intro-node-jump" data-step="3" class="intro-heap-pill pill-b3">B3: Max-Heap</button>
          <button type="button" data-action="intro-node-jump" data-step="4" class="intro-heap-pill pill-b4">B4: Hoàn tất</button>
        </div>
      `),d.className=`intro-tree-node node-${r.algoType}`,d.innerHTML=`
      <div class="intro-node-badge">${r.badge}</div>
      <div class="intro-node-range">${r.rangeText}</div>
      <div class="intro-node-detail">${r.detail}</div>
      ${l}
    `,d.addEventListener("click",h=>{const b=h.target.closest('[data-action="intro-node-jump"]');if(b){h.stopPropagation(),P(Number(b.dataset.step));return}r.extraStep!==void 0&&n.introStep===r.step?P(r.extraStep):P(r.step)}),d.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),P(r.step))}),c.appendChild(d),n.introTreeNodeEls.set(r.id,{el:d,node:r})}),at(t))}function Pt(t,e){const s=document.getElementById("intro-depth-ruler"),a=document.getElementById("intro-depth-pointer"),i=document.getElementById("intro-depth-fill"),c=document.getElementById("intro-tree-canvas"),r=document.getElementById("intro-active-ring");if(s&&a&&i){const l=t.depthRows.findIndex(o=>o.depth===e.depth),h=l>=0?l:0,b=t.rowCentersPct[h],u=s.clientHeight||t.minHeightPx,y=b/100*u-7;a.style.transform=`translate3d(0, ${y}px, 0)`,i.style.height=`${b}%`,e.depth===0?(i.style.background="linear-gradient(180deg, #a855f7 0%, #f59e0b 55%, #ef4444 100%)",a.style.backgroundColor="#ef4444",a.style.boxShadow="0 0 16px rgba(239, 68, 68, 0.9)",a.classList.add("intro-danger-ripple")):e.depth<=4&&t.id==="tab1"?(i.style.background="linear-gradient(180deg, #a855f7 0%, #f59e0b 100%)",a.style.backgroundColor="#f59e0b",a.style.boxShadow="0 0 14px rgba(245, 158, 11, 0.8)",a.classList.remove("intro-danger-ripple")):(i.style.background="linear-gradient(180deg, #a855f7 0%, #6366f1 100%)",a.style.backgroundColor="#a855f7",a.style.boxShadow="0 0 14px rgba(168, 85, 247, 0.85)",a.classList.remove("intro-danger-ripple"))}let p=null,d="quick";if(n.introTreeNodeEls.forEach(({el:l,node:h})=>{const b=n.introStep>=h.step,u=n.introStep===h.step||h.extraStep!==void 0&&n.introStep===h.extraStep;if(u&&(p=l,d=h.algoType),l.className=`intro-tree-node node-${h.algoType} ${b?"is-reached":""} ${u?"is-current":""}`,h.extraStep!==void 0){const y=l.querySelector(".pill-b3"),o=l.querySelector(".pill-b4");y&&(y.className=`intro-heap-pill pill-b3 ${n.introStep===3?"is-active":""}`),o&&(o.className=`intro-heap-pill pill-b4 ${n.introStep===4?"is-active":""}`)}}),r&&c)if(p){const l=c.getBoundingClientRect(),h=p.getBoundingClientRect();if(l.width>0&&h.width>0){const u=h.left-l.left-4,y=h.top-l.top-4;r.style.transform=`translate3d(${u}px, ${y}px, 0)`,r.style.width=`${h.width+8}px`,r.style.height=`${h.height+8}px`,r.style.opacity="1",d==="heap"?(r.style.border="2px solid #fb923c",r.style.boxShadow="0 0 22px rgba(249, 115, 22, 0.55)"):d==="insertion"?(r.style.border="2px solid #4ade80",r.style.boxShadow="0 0 20px rgba(34, 197, 94, 0.45)"):(r.style.border="2px solid #c084fc",r.style.boxShadow="0 0 20px rgba(168, 85, 247, 0.5)")}}else r.style.opacity="0";n.introTreeEdgeEls.forEach(({edge:l,pathEl:h,labelEl:b,length:u})=>{const y=n.introStep>=l.revealStep,o=l.isDanger?"#f97316":l.branch==="left"?"#a855f7":"#38bdf8";h.setAttribute("stroke",o),h.style.strokeDashoffset=y?"0":`${u}`,h.style.opacity=y?"0.95":"0",b.setAttribute("fill",y?o:"#52525b"),b.style.opacity=y?"1":"0.4"})}function Ee(t,e){const s=document.getElementById("intro-heap-panel");if(!s)return;const a=t.id==="tab2"&&(e.step===3||e.step===4);if(s.classList.toggle("is-open",a),n.introHeapSyncTimer&&(clearTimeout(n.introHeapSyncTimer),n.introHeapSyncTimer=null),t.id==="tab2"){const h=Math.round(620/n.introSpeed)+40;n.introHeapSyncTimer=setTimeout(()=>{n.introHeapSyncTimer=null,H[n.slideIndex]?.id===10&&n.introTab==="tab2"&&at(L())},h)}if(!a)return;const i=e.step===3,c=e.array.slice(0,6),r=document.getElementById("intro-heap-title"),p=document.getElementById("intro-heap-sub"),d=document.getElementById("intro-heap-badge"),l=document.getElementById("intro-heap-note");i?(r&&(r.textContent="Build Max-Heap [0..5]",r.className="intro-heap-title"),p&&(p.textContent="Bước 3: Dựng cây Max-Heap (Cha ≥ Con)"),d&&(d.textContent="Max-Heap",d.className="intro-heap-badge"),l&&(l.innerHTML='Gốc <strong style="color:#fdba74;">15</strong> lớn nhất nằm ở đỉnh A[0]. Các nhánh con (12 ≥ 7, 4 và 13 ≥ 11) đều thỏa tính chất Max-Heap.')):(r&&(r.textContent="Extract-Max Hoàn tất [0..5]",r.className="intro-heap-title is-done"),p&&(p.textContent="Bước 4: Rút dần gốc lớn nhất về cuối"),d&&(d.textContent="Đã sắp xếp ✓",d.className="intro-heap-badge is-done"),l&&(l.innerHTML='Các nút lướt về đúng thứ tự tăng dần <strong style="color:#86efac;">[4, 7, 11, 12, 13, 15]</strong> với độ phức tạp đảm bảo O(n log n).')),n.introHeapEdgeEls.forEach(h=>{h.setAttribute("stroke",i?"#f97316":"#22c55e"),h.setAttribute("opacity",i?"0.68":"0.4"),h.setAttribute("stroke-dasharray",i?"":"4 3")}),c.forEach((h,b)=>{const u=n.introHeapNodeEls.get(h);if(!u)return;const{x:y,y:o}=G[b],g=b===0;u.style.transform=`translate3d(${y}px, ${o}px, 0) scale(${g&&i?1.12:1})`,i?(u.style.backgroundColor=g?"#c2410c":"#2a160c",u.style.borderColor=g?"#fdba74":"#f97316",u.style.color="#ffffff",u.style.boxShadow=g?"0 0 18px rgba(249, 115, 22, 0.7)":"none"):(u.style.backgroundColor="#0f291e",u.style.borderColor="#22c55e",u.style.color="#d1fae5",u.style.boxShadow="0 0 12px rgba(34, 197, 94, 0.25)");const x=u.querySelector(".intro-heap-idx-tag");x&&(x.textContent=`[${b}]`)})}function mt(){const t=L().steps.length-1,e=document.getElementById("intro-btn-prev"),s=document.getElementById("intro-btn-next"),a=document.getElementById("intro-btn-auto");e&&(e.disabled=n.introStep===0),s&&(s.disabled=n.introStep>=t),a&&(n.introPlaying?a.innerHTML="<span>⏸</span><span>Tạm dừng</span>":n.introStep>=t?a.innerHTML="<span>↻</span><span>Chạy lại</span>":a.innerHTML="<span>▶</span><span>Tự động chạy</span>")}function J(t=!0){const e=L(),s=it();dt(),ht(s,t),Ce(s,e),Pt(e,s),Ee(e,s),mt()}function Be(){Rt(),$e(),Ie(),Ot(L()),n.introResizeObserver&&(n.introResizeObserver.disconnect(),n.introResizeObserver=null);const t=document.getElementById("intro-tree-canvas"),e=document.getElementById("intro-array-track");if(typeof ResizeObserver<"u"&&(t||e)){let s=null;n.introResizeObserver=new ResizeObserver(()=>{s&&cancelAnimationFrame(s),s=requestAnimationFrame(()=>{H[n.slideIndex]?.id===10&&(dt(),ht(it(),!1),at(L()))})}),t&&n.introResizeObserver.observe(t),e&&n.introResizeObserver.observe(e)}requestAnimationFrame(()=>{H[n.slideIndex]?.id===10&&(dt(),ht(it(),!1),at(L()),J(!1))})}function j(){n.introTimer!==null&&(clearTimeout(n.introTimer),n.introTimer=null),n.introHeapSyncTimer!==null&&(clearTimeout(n.introHeapSyncTimer),n.introHeapSyncTimer=null),n.introPlaying=!1,mt()}function Ft(){if(!n.introPlaying)return;const t=L().steps.length-1,e=Math.round(1350/n.introSpeed);n.introTimer=setTimeout(()=>{n.introPlaying&&(n.introStep<t?(n.introStep+=1,J(!0),n.introStep>=t?j():Ft()):j())},e)}function _t(){const t=L().steps.length-1;if(n.introPlaying){j();return}n.introStep>=t&&(n.introStep=0,J(!0)),n.introPlaying=!0,mt(),n.introTimer=setTimeout(()=>{n.introPlaying&&(n.introStep<t?(n.introStep+=1,J(!0),n.introStep<t?Ft():j()):j())},160)}function P(t){j();const e=L().steps.length-1,s=Math.max(0,Math.min(t,e));s!==n.introStep&&(n.introStep=s,J(!0))}function pt(t){n.introTab!==t&&(j(),n.introTab=t,n.introStep=0,Ot(L()),J(!0))}function Ae(){return`
    <div class="bento-grid flex-1 min-h-0">
      <div class="col-6 h-full min-h-0">
        ${V("introsort_driver.py (Khử đệ quy đuôi)","python",ie,0)}
      </div>

      <div class="bento-col col-6">
        <div class="bento-card bento-card-auto bento-item" style="--stagger:1">
          <h3 class="bento-title">Ánh xạ chỉ số Heap (Offset) trên đoạn con [low..high]</h3>
          <div class="bento-subgrid-2 mt-2" style="height:auto;">
            <div class="bento-subtile">
              <div class="bento-caption">Heap chuẩn (từ 0)</div>
              <div class="mono mt-1" style="font-size:var(--fs-code); color:#F5F5F7; line-height:1.5;">
                Cha: i &nbsp;|&nbsp; Trái: 2*i + 1<br/>Phải: 2*i + 2
              </div>
            </div>
            <div class="bento-subtile" style="border-color:rgba(191,90,242,0.45);">
              <div class="bento-caption" style="color:#BF5AF2;">Đoạn [low..high] (offset = low)</div>
              <div class="mono mt-1" style="font-size:var(--fs-code); color:#F5F5F7; line-height:1.5;">
                Cha: low + i &nbsp;|&nbsp; Trái: low + 2*i + 1<br/>Phải: low + 2*i + 2
              </div>
            </div>
          </div>
          <p class="bento-body mt-2" style="color:#30D158;">
            <strong>Lợi ích cốt lõi:</strong> Tuyệt đối không dùng list slicing (<code>arr[a:b]</code>), bảo toàn bộ nhớ phụ <strong>O(1)</strong>!
          </p>
        </div>

        ${V("heapsort_subarray_offset.py","python",ae,2)}
      </div>
    </div>
  `}function He(){return`
    <div class="bento-grid bento-grid-auto">
      <div class="bento-card bento-card-accent col-4 bento-item" style="--stagger:0">
        <span class="badge-pill badge-purple">Cận trên mọi trường hợp</span>
        <div class="hero-stat-accent mt-2">Θ(n log n)</div>
        <p class="bento-body mt-1">Chống lại chuỗi <em>Median-of-3 Killer</em>.</p>
      </div>

      <div class="bento-card col-4 bento-item" style="--stagger:1">
        <span class="badge-pill badge-blue">Call Stack khóa cứng</span>
        <div class="hero-stat mt-2">Θ(log n)</div>
        <p class="bento-body mt-1">Tối đa <code>2⌊log₂ n⌋ + 1</code> khung hàm.</p>
      </div>

      <div class="bento-card col-4 bento-item" style="--stagger:2">
        <span class="badge-pill badge-mint">Aux RAM tại chỗ</span>
        <div class="hero-stat mt-2">Θ(1)</div>
        <p class="bento-body mt-1">Zero list slicing, chỉ dùng biến chỉ số.</p>
      </div>
    </div>

    <div class="bento-grid flex-1 min-h-0">
      <div class="bento-card col-7 bento-item justify-between" style="--stagger:3">
        <h3 class="bento-title">Chứng minh chặn trên Thời gian Θ(n log n)</h3>
        <div class="flex-col gap-2 mt-2 flex-1 justify-between">
          <div class="bento-subtile">
            <p class="bento-body"><strong>• Tốt nhất:</strong> <code class="mono" style="color:#30D158">Θ(n log n)</code> — Phân hoạch chia đôi cân bằng ở mọi mức.</p>
          </div>
          <div class="bento-subtile">
            <p class="bento-body"><strong>• Trung bình:</strong> <code class="mono" style="color:#64D2FF">Θ(n log n)</code> — Khoảng <code>≈ 1.188 n log₂(n)</code> phép so sánh nhờ Median-of-Three (thấp hơn <code>1.386 n log₂(n)</code> của Quicksort ngẫu nhiên).</p>
          </div>
          <div class="bento-subtile" style="border-color:rgba(191,90,242,0.45);">
            <p class="bento-body">
              <strong>• Xấu nhất (Median-of-3 Killer):</strong>
              1. Quicksort tối đa <code>2⌊log₂ n⌋</code> mức ⇒ <code>O(n log n)</code> •
              2. Heapsort các đoạn rời nhau <code>Σkᵢ ≤ n</code> ⇒ <code>O(n log n)</code> •
              3. Insertion Sort đoạn <code>≤ 16</code> ⇒ <code>O(n)</code>.
              <strong style="color:#BF5AF2">⇒ Khóa chặt Θ(n log n).</strong>
            </p>
          </div>
        </div>
      </div>

      <div class="bento-col col-5">
        <div class="bento-card flex-1 bento-item" style="--stagger:4">
          <h3 class="bento-title" style="color:#30D158">1. Thao tác tại chỗ: Θ(1)</h3>
          <p class="bento-body mt-2">
            <code>partition_median_of_three</code>, <code>heapsort_subarray</code> và <code>insertion_sort</code> chỉ dùng vài biến chỉ số cục bộ. Không dùng list slicing hay mảng phụ.
          </p>
        </div>

        <div class="bento-card bento-card-accent flex-1 bento-item" style="--stagger:5">
          <h3 class="bento-title" style="color:#5AC8FA">2. Ngăn xếp đệ quy: Θ(log n)</h3>
          <p class="bento-body mt-2">
            Khóa cứng tối đa <code>2⌊log₂ n⌋ + 1</code> khung hàm trên Call Stack ⇒ <strong>Θ(log n)</strong>, chống tràn Stack <code>O(n)</code> tuyệt đối so với Quicksort truyền thống.
          </p>
        </div>
      </div>
    </div>
  `}function Me(){return`
    <div class="bento-grid flex-1 min-h-0">
      <div class="bento-col col-6">
        <div class="bento-card bento-card-auto bento-item" style="--stagger:0">
          <div class="flex-row gap-2 flex-wrap">
            <span class="badge-pill badge-purple">1. Sàn Thương mại điện tử</span>
            <span class="badge-pill badge-blue">2. Request Logs (P50 / P90)</span>
          </div>
          <p class="bento-body mt-2">
            • Sắp xếp hàng triệu sản phẩm theo <strong>"Giá từ thấp đến cao"</strong> tức thì nhờ tính thân thiện CPU Cache của nhánh Quicksort.<br/>
            • Khắc phục tính không ổn định (<em>Unstable</em>) khi tính P50, P90 Latency bằng khóa tuple <code>(latency_ms, arrival_seq)</code>.
          </p>
        </div>
        ${V("ecommerce_and_logs.py","python",`class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

# Sắp xếp hàng triệu sản phẩm theo "Giá từ thấp đến cao"
introsort(products, key=lambda p: p.price)

# Phân tích Request Logs (tìm P50, P90 Latency):
# Xử lý tính Unstable bằng khóa tuple (latency_ms, arrival_seq)
introsort(logs, key=lambda r: (r.latency_ms, r.arrival_seq))`,1)}
      </div>

      <div class="bento-col col-6">
        <div class="bento-card bento-card-auto bento-item" style="--stagger:2">
          <span class="badge-pill badge-mint">3. LeetCode 912 — Sort an Array</span>
          <p class="bento-body mt-2">
            Vượt qua toàn bộ test case anti-Quicksort khắc nghiệt trong thời gian đảm bảo <code>O(n log n)</code> mà không dùng hàm sort có sẵn.
          </p>
        </div>
        ${V("leetcode_912_introsort.py","python",oe,3)}
      </div>
    </div>
  `}function Ne(){return`
    <div class="bento-grid flex-1 min-h-0">
      <div class="bento-card bento-card-accent col-5 bento-item justify-between" style="--stagger:0">
        <div>
          <span class="badge-pill badge-amber">Bài toán đặt ra</span>
          <div class="hero-stat-accent mt-2">O(1) RAM</div>
          <h3 class="bento-title mt-2">Tại chỗ &amp; O(n log n) mọi trường hợp</h3>
          <p class="bento-body mt-2">
            Sắp xếp mảng <code>n</code> phần tử tăng dần ngay tại chỗ (<strong>In-place</strong>) với bộ nhớ phụ <strong>O(1) tuyệt đối</strong> và đảm bảo thời gian <strong>O(n log n)</strong> ngay cả trường hợp xấu nhất.
          </p>
        </div>
        <div class="bento-subtile mt-3">
          <div class="bento-caption">Ví dụ minh họa</div>
          <div class="mono font-bold mt-1" style="color:#FFD60A; font-size:var(--fs-table);">
            Input : [4, 10, 3, 5, 1] → Output: [1, 3, 4, 5, 10]
          </div>
        </div>
      </div>

      <div class="bento-card col-7 bento-item justify-between" style="--stagger:1">
        <div>
          <span class="badge-pill badge-amber">Ý tưởng cốt lõi</span>
          <h3 class="bento-title mt-2">Cây nhị phân hoàn chỉnh (Binary Heap) trên mảng 1 chiều</h3>
          <p class="bento-body mt-2">
            <strong>Không dùng con trỏ!</strong> Biểu diễn cây trực tiếp trên mảng 1 chiều với nút cha tại chỉ số <code>i</code>:
          </p>
        </div>
        <div class="bento-subgrid-2 mt-3" style="height:auto;">
          <div class="bento-subtile" style="border-color:rgba(255,159,10,0.4);">
            <div class="bento-caption">Con trái của nút i</div>
            <div class="mono font-bold mt-2" style="font-size:1.75rem; color:#FF9F0A;">left = 2*i + 1</div>
          </div>
          <div class="bento-subtile" style="border-color:rgba(255,214,10,0.4);">
            <div class="bento-caption">Con phải của nút i</div>
            <div class="mono font-bold mt-2" style="font-size:1.75rem; color:#FFD60A;">right = 2*i + 2</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bento-grid bento-grid-auto">
      <div class="bento-card col-6 bento-item" style="--stagger:2">
        <span class="badge-pill badge-amber">Giai đoạn 1</span>
        <h3 class="bento-title mt-2">Build Max-Heap (Tạo đống cực đại)</h3>
        <p class="bento-body mt-2">
          Biến mảng ban đầu thành Max-Heap: mọi nút cha <code>≥</code> nút con, đảm bảo phần tử lớn nhất nằm ở đỉnh gốc <code>arr[0]</code>.
        </p>
      </div>

      <div class="bento-card col-6 bento-item" style="--stagger:3">
        <span class="badge-pill badge-mint">Giai đoạn 2</span>
        <h3 class="bento-title mt-2">Extract &amp; Sift-down (Rút gốc &amp; Vun lại đống)</h3>
        <p class="bento-body mt-2">
          Hoán đổi <code>arr[0]</code> về cuối mảng (khóa vị trí đã xếp), giảm kích thước Heap đi 1, gọi <code>sift_down</code> đưa phần tử lớn tiếp theo lên gốc.
        </p>
      </div>
    </div>
  `}function jt(){return`Trực quan hóa đồng bộ Cây Heap thu gọn + Mảng 1 chiều có vách ngăn trượt cho arr = [${n.heapRawArray.join(", ")}]`}function qt(){const t=Math.round(620/n.heapSpeed);document.documentElement.style.setProperty("--heap-anim-ms",`${t}ms`);const e=document.getElementById("heap-speed-label");e&&(e.textContent=`${n.heapSpeed.toFixed(n.heapSpeed%1===0?1:2)}x`)}function Z(t){if(n.heapHoveredId!==t){if(n.heapHoveredId!==null){const e=n.heapTreeNodeEls.get(n.heapHoveredId),s=n.heapArrayTileEls.get(n.heapHoveredId);e&&e.inner.classList.remove("heap-hover-node"),s&&s.inner.classList.remove("heap-hover-tile")}if(n.heapHoveredId=t,t!==null){const e=n.heapTreeNodeEls.get(t),s=n.heapArrayTileEls.get(t);e&&e.inner.classList.add("heap-hover-node"),s&&s.inner.classList.add("heap-hover-tile")}}}function Dt(t){const e=document.getElementById("heap-tree-stage"),s=e?.clientWidth||440,a=e?.clientHeight||280,i=Math.floor(Math.log2(t))+1,c=40,p=Math.max(110,a-c-46),d=i>1?p/(i-1):0,l=Math.min(42,s*.09),h=Math.max(160,s-l*2),b=[];for(let u=0;u<t;u++){const y=Math.floor(Math.log2(u+1)),o=u-(Math.pow(2,y)-1),g=Math.pow(2,y),x=l+(o+.5)/g*h,m=c+y*d;b.push({x,y:m})}return b}function Re(){const t=`${n.heapSpeed.toFixed(n.heapSpeed%1===0?1:2)}x`;return`
    <div id="heap-sim-root" class="heap-shell">
      <section class="heap-controls-bar">
        <div class="heap-ctrl-group">
          <button id="heap-btn-prev" type="button" class="heap-btn" data-action="heap-prev" title="Quay lại 1 bước ([)">
            <span>⏮</span><span>Quay lại</span>
          </button>
          <button id="heap-btn-next" type="button" class="heap-btn-next" data-action="heap-next" title="Bước tiếp theo (])">
            <span>Bước tiếp</span><span>⏭</span>
          </button>
          <button id="heap-btn-auto" type="button" class="heap-btn-auto" data-action="heap-auto" title="Tự động chạy / Tạm dừng (P)">
            <span>▶</span><span>Tự động chạy</span>
          </button>
          <button id="heap-btn-reset" type="button" class="heap-btn" data-action="heap-reset" title="Đặt lại về Bước 0 (R)">
            <span>↺</span><span>Đặt lại</span>
          </button>
        </div>

        <div class="heap-ctrl-group">
          <button id="heap-btn-sample" type="button" class="heap-btn-mode ${n.heapIsSample?"is-active":""}" data-action="heap-sample" title="Mảng mẫu 4 phần tử [4, 10, 3, 5]">
            <span>📌</span><span>Mảng mẫu [4, 10, 3, 5]</span>
          </button>
          <button id="heap-btn-random" type="button" class="heap-btn-mode ${n.heapIsSample?"":"is-active"}" data-action="heap-random" title="Tạo mảng ngẫu nhiên 7 phần tử khác nhau">
            <span>🎲</span><span>Ngẫu nhiên (7 phần tử)</span>
          </button>
          <div class="heap-speed-box">
            <span>Tốc độ</span>
            <input id="heap-speed-slider" class="heap-speed-slider" type="range" min="0.5" max="2.5" step="0.25" value="${n.heapSpeed}" aria-label="Tốc độ mô phỏng" />
            <span id="heap-speed-label" class="heap-speed-label">${t}</span>
          </div>
        </div>
      </section>

      <main class="heap-main-grid">
        <section class="heap-tree-card bento-item" style="--stagger:0">
          <div class="heap-card-header">
            <h3 class="heap-card-title">Sơ đồ Cây nhị phân "co lại"</h3>
            <span id="heap-size-badge" class="heap-size-badge is-full">Kích thước Heap: 4 / 4</span>
          </div>

          <div id="heap-tree-stage" class="heap-tree-stage" aria-label="Sơ đồ Cây nhị phân Heap co lại">
            <svg id="heap-tree-svg" xmlns="http://www.w3.org/2000/svg"></svg>
            <div id="heap-slots-layer" class="heap-slots-layer"></div>
            <div id="heap-nodes-layer" class="heap-nodes-layer"></div>
          </div>

          <div class="heap-tree-legend">
            <div class="heap-legend-dots">
              <span class="heap-legend-item"><span class="heap-legend-dot" style="background:#f59e0b"></span>Heap</span>
              <span class="heap-legend-item"><span class="heap-legend-dot" style="background:#38bdf8"></span>So sánh</span>
              <span class="heap-legend-item"><span class="heap-legend-dot" style="background:#f97316"></span>Hoán đổi</span>
              <span class="heap-legend-item"><span class="heap-legend-dot" style="background:#10b981"></span>Đã khóa</span>
            </div>
            <span style="font-size:0.65rem; color:#71717a;">Di chuột vào nút để soi mảng</span>
          </div>
        </section>

        <section class="heap-right-col bento-item" style="--stagger:1">
          <div class="heap-array-card">
            <div class="heap-card-header">
              <h3 class="heap-card-title">Mảng 1 chiều &amp; Vách ngăn động</h3>
              <span id="heap-summary-chip" class="heap-summary-chip">[4, 10, 3, 5]</span>
            </div>

            <div class="heap-array-stage">
              <div class="heap-region-labels">
                <span id="heap-label-heap" style="color:#fbbf24; transition:opacity 0.3s ease;">◀ VÙNG HEAP</span>
                <span id="heap-label-sorted" style="color:#34d399; opacity:0.35; transition:opacity 0.3s ease;">VÙNG ĐÃ XẾP ▶</span>
              </div>

              <div class="heap-arcs-wrap">
                <svg id="heap-arcs-svg" xmlns="http://www.w3.org/2000/svg"></svg>
              </div>

              <div id="heap-array-track" class="heap-array-track">
                <div id="heap-region-bg" class="heap-region-backdrop is-heap"></div>
                <div id="heap-sorted-bg" class="heap-region-backdrop is-sorted"></div>
                <div id="heap-divider">
                  <div class="heap-divider-line"></div>
                  <span class="heap-divider-tag">|</span>
                </div>
                <div id="heap-tiles-layer" class="heap-tiles-layer"></div>
              </div>

              <div id="heap-index-row" class="heap-index-row"></div>
            </div>
          </div>

          <div id="heap-explain-card" class="heap-explain-card border-init">
            <div class="heap-explain-top">
              <div class="heap-explain-badges">
                <span id="heap-phase-badge" class="heap-phase-badge heap-phase-init">Khởi tạo</span>
                <span id="heap-step-pill" class="heap-step-pill">Bước 0 / 0</span>
                <span id="heap-action-badge" class="heap-action-badge heap-action-init">Mảng ban đầu</span>
              </div>
              <div class="heap-stats-group">
                <div class="heap-stat-pill">
                  <span>So sánh:</span>
                  <span id="heap-stat-cmp" class="font-bold" style="color:#38bdf8; font-variant-numeric:tabular-nums;">0</span>
                </div>
                <div class="heap-stat-pill">
                  <span>Hoán đổi:</span>
                  <span id="heap-stat-swaps" class="font-bold" style="color:#f97316; font-variant-numeric:tabular-nums;">0</span>
                </div>
              </div>
            </div>

            <div class="heap-desc-box">
              <p id="heap-step-desc" class="heap-desc-text"></p>
            </div>
          </div>
        </section>
      </main>

      <section class="heap-timeline-bar bento-item" style="--stagger:2">
        <div class="heap-timeline-header">
          <div class="heap-timeline-meta">
            <span class="font-bold" style="color:#ffffff;">Thanh tiến độ 2 Pha</span>
            <span class="heap-legend-item" style="color:#fcd34d; font-size:0.7rem;">
              <span class="heap-legend-dot" style="background:#fbbf24; width:7px; height:7px;"></span>Pha 1: Build Max-Heap
            </span>
            <span class="heap-legend-item" style="color:#6ee7b7; font-size:0.7rem;">
              <span class="heap-legend-dot" style="background:#34d399; width:7px; height:7px;"></span>Pha 2: Rút gốc &amp; Vun lại
            </span>
          </div>
          <div class="heap-kbd-hint">
            Phím tắt mô phỏng: <kbd>P</kbd> Chạy/Dừng · <kbd>[</kbd> <kbd>]</kbd> Lùi/Tiến · <kbd>R</kbd> Đặt lại
          </div>
        </div>
        <div id="heap-timeline-row" class="heap-timeline-row"></div>
      </section>
    </div>
  `}function zt(t){const e=document.getElementById("heap-tree-stage"),s=document.getElementById("heap-tree-svg"),a=document.getElementById("heap-slots-layer"),i=document.getElementById("heap-nodes-layer");if(!e||!s||!a||!i)return;const c=t.length;n.heapTreeCoords=Dt(c);const r=e.clientWidth||440,p=e.clientHeight||280;s.setAttribute("viewBox",`0 0 ${r} ${p}`),s.innerHTML="",n.heapTreeEdgeEls=[];for(let d=1;d<c;d++){const l=Math.floor((d-1)/2),h=n.heapTreeCoords[l],b=n.heapTreeCoords[d],u=document.createElementNS("http://www.w3.org/2000/svg","line");u.setAttribute("x1",h.x),u.setAttribute("y1",h.y),u.setAttribute("x2",b.x),u.setAttribute("y2",b.y),u.setAttribute("stroke","#92400e"),u.setAttribute("stroke-width","2.5"),u.setAttribute("stroke-linecap","round"),u.setAttribute("class","heap-tree-edge"),s.appendChild(u),n.heapTreeEdgeEls.push({parent:l,child:d,lineEl:u})}a.innerHTML="",n.heapTreeCoords.forEach((d,l)=>{const h=document.createElement("div");h.className="heap-slot-label",h.style.left=`${d.x}px`,h.style.top=`${d.y+29}px`,h.textContent=`arr[${l}]`,a.appendChild(h)}),i.innerHTML="",n.heapTreeNodeEls.clear(),t.forEach((d,l)=>{const h=document.createElement("div");h.className="heap-node-outer",h.dataset.itemId=String(d.id);const b=document.createElement("div");b.className="heap-node-scale";const u=document.createElement("div");u.className="heap-node-inner";const y=document.createElement("span");y.textContent=String(d.val);const o=document.createElement("span");o.className="heap-node-lock",o.innerHTML=`
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    `,u.appendChild(y),u.appendChild(o),b.appendChild(u),h.appendChild(b),i.appendChild(h);const g=n.heapTreeCoords[l];h.style.transform=`translate3d(${g.x}px, ${g.y}px, 0)`,h.addEventListener("mouseenter",()=>Z(d.id)),h.addEventListener("mouseleave",()=>Z(null)),n.heapTreeNodeEls.set(d.id,{outer:h,scaleWrap:b,inner:u,lockEl:o})})}function kt(){const t=document.getElementById("heap-tree-stage"),e=document.getElementById("heap-tree-svg"),s=document.getElementById("heap-slots-layer");if(!t||!e||!s)return;const a=n.heapRawArray.length;n.heapTreeCoords=Dt(a);const i=t.clientWidth||440,c=t.clientHeight||280;e.setAttribute("viewBox",`0 0 ${i} ${c}`),n.heapTreeEdgeEls.forEach(({parent:r,child:p,lineEl:d})=>{const l=n.heapTreeCoords[r],h=n.heapTreeCoords[p];!l||!h||(d.setAttribute("x1",l.x),d.setAttribute("y1",l.y),d.setAttribute("x2",h.x),d.setAttribute("y2",h.y))}),Array.from(s.children).forEach((r,p)=>{const d=n.heapTreeCoords[p];d&&(r.style.left=`${d.x}px`,r.style.top=`${d.y+29}px`)})}function Kt(t){const s=document.getElementById("heap-array-track")?.clientWidth||460,a=t<=4?14:10,i=(s-a*(t-1))/t;return{trackW:s,gap:a,slotW:i}}function Vt(t){const e=document.getElementById("heap-tiles-layer"),s=document.getElementById("heap-index-row");if(!e||!s)return;const a=t.length;e.innerHTML="",s.innerHTML="",n.heapArrayTileEls.clear();const{gap:i,slotW:c}=Kt(a);s.style.gridTemplateColumns=`repeat(${a}, minmax(0, 1fr))`,s.style.gap=`${i}px`;for(let r=0;r<a;r++){const p=document.createElement("div");p.className="heap-index-cell",p.textContent=`[${r}]`,s.appendChild(p)}t.forEach((r,p)=>{const d=document.createElement("div");d.className="heap-tile-outer",d.dataset.itemId=String(r.id),d.style.width=`${c}px`,d.style.transform=`translate3d(${p*(c+i)}px, 0, 0)`;const l=document.createElement("div");l.className="heap-tile-inner";const h=document.createElement("span");h.className="heap-tile-role";const b=document.createElement("span");b.className="heap-tile-val",b.style.fontSize=a<=4?"1.35rem":"1.12rem",b.textContent=String(r.val);const u=document.createElement("span");u.className="heap-tile-lock",u.textContent="🔒",l.appendChild(h),l.appendChild(b),l.appendChild(u),d.appendChild(l),e.appendChild(d),d.addEventListener("mouseenter",()=>Z(r.id)),d.addEventListener("mouseleave",()=>Z(null)),n.heapArrayTileEls.set(r.id,{outer:d,inner:l,valEl:b,roleEl:h,lockEl:u})})}function Le(t,e,s){const a=document.getElementById("heap-array-track"),i=document.getElementById("heap-arcs-svg");if(!a||!i)return;const c=a.clientWidth||460,r=40;i.setAttribute("viewBox",`0 0 ${c} ${r}`),i.innerHTML="";const p=l=>l*(e+s)+e/2,d=[];if(t.comparing){const l=p(t.comparing.parent);t.comparing.children.forEach((h,b)=>{const u=p(h.idx),y=(l+u)/2,o=b===0?16:4,g=document.createElementNS("http://www.w3.org/2000/svg","path");g.setAttribute("d",`M ${l} ${r-2} Q ${y} ${o}, ${u} ${r-2}`),g.setAttribute("fill","none"),g.setAttribute("stroke","#38bdf8"),g.setAttribute("stroke-width","2"),g.setAttribute("stroke-linecap","round"),g.setAttribute("class","heap-formula-arc"),i.appendChild(g);const x=g.getTotalLength();g.style.strokeDasharray=`${x}`,g.style.strokeDashoffset=`${x}`,d.push(g),[l,u].forEach(f=>{const k=document.createElementNS("http://www.w3.org/2000/svg","circle");k.setAttribute("cx",f),k.setAttribute("cy",r-2),k.setAttribute("r","2.6"),k.setAttribute("fill","#38bdf8"),i.appendChild(k)});const m=document.createElementNS("http://www.w3.org/2000/svg","text");m.setAttribute("x",y+(b===1?16:-6)),m.setAttribute("y",o+8),m.setAttribute("text-anchor","middle"),m.setAttribute("font-size","10"),m.setAttribute("font-weight","700"),m.setAttribute("font-family","JetBrains Mono, monospace"),m.setAttribute("fill","#7dd3fc"),m.textContent=h.formula,i.appendChild(m)})}else if(t.swapping&&t.swapping.length===2){const[l,h]=t.swapping,b=p(l),u=p(h),y=(b+u)/2,o=document.createElementNS("http://www.w3.org/2000/svg","path");o.setAttribute("d",`M ${b} ${r-2} Q ${y} 5, ${u} ${r-2}`),o.setAttribute("fill","none"),o.setAttribute("stroke","#f97316"),o.setAttribute("stroke-width","2.2"),o.setAttribute("stroke-linecap","round"),o.setAttribute("class","heap-formula-arc"),i.appendChild(o);const g=o.getTotalLength();o.style.strokeDasharray=`${g}`,o.style.strokeDashoffset=`${g}`,d.push(o);const x=document.createElementNS("http://www.w3.org/2000/svg","text");x.setAttribute("x",y),x.setAttribute("y",13),x.setAttribute("text-anchor","middle"),x.setAttribute("font-size","10"),x.setAttribute("font-weight","700"),x.setAttribute("fill","#fdba74"),x.textContent="⇄ Hoán đổi",i.appendChild(x)}d.length>0&&requestAnimationFrame(()=>{d.forEach(l=>{l.style.strokeDashoffset="0"})})}function Wt(){const t=document.getElementById("heap-timeline-row");if(!t)return;t.innerHTML="";let e=null;n.heapFrames.forEach((s,a)=>{if(s.phase==="build"&&e!=="build"){const c=document.createElement("span");c.className="heap-timeline-sep",c.style.color="#fbbf24",c.textContent="Pha 1",t.appendChild(c)}else if(s.phase==="extract"&&e!=="extract"){const c=document.createElement("span");c.className="heap-timeline-sep",c.style.color="#34d399",c.textContent="Pha 2",t.appendChild(c)}e=s.phase;const i=document.createElement("button");i.type="button",i.dataset.stepIdx=String(a),i.textContent=`${a}. ${s.pillLabel}`,i.className="heap-timeline-pill",i.addEventListener("click",()=>K(a)),t.appendChild(i)})}function Oe(){const t=document.getElementById("heap-timeline-row");if(!t)return;t.querySelectorAll(".heap-timeline-pill").forEach(s=>{const a=Number(s.dataset.stepIdx),i=n.heapFrames[a];a===n.heapStep?(i.phase==="done"||i.actionType==="lock"?s.className="heap-timeline-pill is-current-emerald":i.phase==="extract"?s.className="heap-timeline-pill is-current-orange":s.className="heap-timeline-pill is-current-amber",s.scrollIntoView({behavior:"smooth",inline:"nearest",block:"nearest"})):a<n.heapStep?s.className="heap-timeline-pill is-past":s.className="heap-timeline-pill"})}function bt(){const t=n.heapFrames.length-1,e=document.getElementById("heap-btn-prev"),s=document.getElementById("heap-btn-next"),a=document.getElementById("heap-btn-auto"),i=document.getElementById("heap-btn-sample"),c=document.getElementById("heap-btn-random");e&&(e.disabled=n.heapStep===0),s&&(s.disabled=n.heapStep>=t),a&&(n.heapPlaying?a.innerHTML="<span>⏸</span><span>Tạm dừng</span>":n.heapStep>=t&&t>0?a.innerHTML="<span>↻</span><span>Chạy lại</span>":a.innerHTML="<span>▶</span><span>Tự động chạy</span>"),i&&(i.className=`heap-btn-mode ${n.heapIsSample?"is-active":""}`),c&&(c.className=`heap-btn-mode ${n.heapIsSample?"":"is-active"}`)}function Pe(t){const e=t.items.length,s=document.getElementById("heap-size-badge");s&&(s.textContent=`Kích thước Heap: ${t.heapSize} / ${e}`,s.className=`heap-size-badge ${t.heapSize===0?"is-done":t.heapSize<e?"is-shrinking":"is-full"}`);const a=document.getElementById("heap-summary-chip");a&&(a.textContent=`[${Tt(t.items,t.heapSize)}]`);const i=document.getElementById("heap-phase-badge");i&&(i.textContent=t.phaseLabel,i.className=`heap-phase-badge heap-phase-${t.phase}`);const c=document.getElementById("heap-step-pill");c&&(c.textContent=`Bước ${n.heapStep} / ${n.heapFrames.length-1}`);const r=document.getElementById("heap-action-badge");r&&(r.textContent=t.actionLabel,r.className=`heap-action-badge heap-action-${t.actionType}`);const p=document.getElementById("heap-explain-card");p&&(p.className=`heap-explain-card border-${t.actionType}`);const d=document.getElementById("heap-step-desc");d&&(d.classList.remove("heap-text-reveal"),d.offsetWidth,d.textContent=t.description,d.classList.add("heap-text-reveal"));const l=document.getElementById("heap-stat-cmp");l&&(l.textContent=String(t.comparisons));const h=document.getElementById("heap-stat-swaps");h&&(h.textContent=String(t.swaps));const b=document.querySelector(".slide-subtitle");b&&H[n.slideIndex]?.id===15&&(b.textContent=jt())}function W(t=!0){const e=n.heapFrames[n.heapStep];if(!e)return;const s=e.items,a=s.length,{trackW:i,gap:c,slotW:r}=Kt(a),p=new Map;e.comparing&&(p.set(e.comparing.parent,`Cha i=${e.comparing.parent}`),e.comparing.children.forEach(m=>{p.set(m.idx,m.formula)}));const d=new Set(e.swapping||[]);s.forEach((m,f)=>{const k=n.heapPrevPosById.get(m.id),w=t&&k!==void 0&&k!==f,C=f>=e.heapSize,$=d.has(f),E=p.has(f),I=e.justLocked===f,v=n.heapTreeNodeEls.get(m.id);if(v){const T=n.heapTreeCoords[f];T&&(v.outer.style.transform=`translate3d(${T.x}px, ${T.y}px, 0)`),v.outer.style.zIndex=w?f<k?"35":"30":$?"25":"20",C?(v.scaleWrap.style.transform="scale(0.82)",v.scaleWrap.style.opacity=I?"0.96":"0.72",v.scaleWrap.style.filter=I?"brightness(1.05)":"brightness(0.85)"):(v.scaleWrap.style.transform="scale(1)",v.scaleWrap.style.opacity="1",v.scaleWrap.style.filter="brightness(1)"),v.inner.classList.remove("heap-arc-up","heap-arc-down"),w&&(v.inner.offsetWidth,v.inner.classList.add(f<k?"heap-arc-up":"heap-arc-down")),C?(v.inner.style.backgroundColor="#0a241b",v.inner.style.borderColor="#10b981",v.inner.style.color="#a7f3d0",v.inner.style.boxShadow=I?"0 0 24px rgba(16, 185, 129, 0.7)":"0 0 10px rgba(16, 185, 129, 0.25)",v.lockEl.style.opacity="1",v.lockEl.style.transform="scale(1)"):$?(v.inner.style.backgroundColor="#3a1709",v.inner.style.borderColor="#f97316",v.inner.style.color="#ffffff",v.inner.style.boxShadow="0 0 24px rgba(249, 115, 22, 0.75)",v.lockEl.style.opacity="0",v.lockEl.style.transform="scale(0.5)"):E?(v.inner.style.backgroundColor="#0b2236",v.inner.style.borderColor="#38bdf8",v.inner.style.color="#e0f2fe",v.inner.style.boxShadow="0 0 22px rgba(56, 189, 248, 0.65)",v.lockEl.style.opacity="0",v.lockEl.style.transform="scale(0.5)"):(v.inner.style.backgroundColor="#1d1609",v.inner.style.borderColor="#f59e0b",v.inner.style.color="#fef3c7",v.inner.style.boxShadow="0 0 12px rgba(245, 158, 11, 0.22)",v.lockEl.style.opacity="0",v.lockEl.style.transform="scale(0.5)")}const S=n.heapArrayTileEls.get(m.id);if(S){const T=f*(r+c);S.outer.style.width=`${r}px`,S.outer.style.transform=`translate3d(${T}px, 0, 0)`,S.outer.style.zIndex=w?f<k?"35":"30":$?"25":"15",S.inner.classList.remove("heap-tile-hop-high","heap-tile-hop-low"),w&&(S.inner.offsetWidth,S.inner.classList.add(f<k?"heap-tile-hop-high":"heap-tile-hop-low"));let N="",B="";C?(S.inner.style.backgroundColor="#0b251c",S.inner.style.borderColor="#10b981",S.inner.style.color="#a7f3d0",S.inner.style.boxShadow=I?"0 0 22px rgba(16, 185, 129, 0.65)":"0 0 10px rgba(16, 185, 129, 0.18)",S.lockEl.style.opacity="1",I&&(N="Khóa",B="role-lock")):$?(S.inner.style.backgroundColor="#3a1709",S.inner.style.borderColor="#f97316",S.inner.style.color="#ffffff",S.inner.style.boxShadow="0 0 22px rgba(249, 115, 22, 0.65)",S.lockEl.style.opacity="0",N=f===0?"Gốc":"Đổi",B="role-swap"):E?(S.inner.style.backgroundColor="#0b2236",S.inner.style.borderColor="#38bdf8",S.inner.style.color="#e0f2fe",S.inner.style.boxShadow="0 0 20px rgba(56, 189, 248, 0.55)",S.lockEl.style.opacity="0",N=p.get(f),B="role-cmp"):(S.inner.style.backgroundColor="#1b150a",S.inner.style.borderColor="#f59e0b",S.inner.style.color="#fef3c7",S.inner.style.boxShadow="0 0 10px rgba(245, 158, 11, 0.15)",S.lockEl.style.opacity="0",f===0&&e.heapSize>0&&(N="Gốc",B="role-root")),N?(S.roleEl.textContent=N,S.roleEl.className=`heap-tile-role is-visible ${B}`):S.roleEl.className="heap-tile-role"}n.heapPrevPosById.set(m.id,f)}),n.heapTreeEdgeEls.forEach(({parent:m,child:f,lineEl:k})=>{const w=f>=e.heapSize,C=e.comparing&&e.comparing.parent===m&&e.comparing.children.some(E=>E.idx===f),$=d.has(m)&&d.has(f);w?(k.setAttribute("stroke","#10b981"),k.setAttribute("stroke-width","1.6"),k.setAttribute("stroke-dasharray","5 5"),k.setAttribute("opacity","0.26")):$?(k.setAttribute("stroke","#f97316"),k.setAttribute("stroke-width","3.6"),k.removeAttribute("stroke-dasharray"),k.setAttribute("opacity","1")):C?(k.setAttribute("stroke","#38bdf8"),k.setAttribute("stroke-width","3.5"),k.removeAttribute("stroke-dasharray"),k.setAttribute("opacity","1")):(k.setAttribute("stroke","#b45309"),k.setAttribute("stroke-width","2.3"),k.removeAttribute("stroke-dasharray"),k.setAttribute("opacity","0.78"))});const l=document.getElementById("heap-slots-layer");l&&Array.from(l.children).forEach((m,f)=>{const k=f>=e.heapSize,w=p.has(f)||d.has(f);m.className=`heap-slot-label ${k?"is-locked":w?"is-active":""}`});const h=document.getElementById("heap-index-row");h&&Array.from(h.children).forEach((m,f)=>{const k=f>=e.heapSize,w=p.has(f)||d.has(f);m.className=`heap-index-cell ${k?"is-locked":w?"is-active":""}`});const b=document.getElementById("heap-region-bg"),u=document.getElementById("heap-sorted-bg"),y=document.getElementById("heap-divider"),o=document.getElementById("heap-label-heap"),g=document.getElementById("heap-label-sorted"),x=6;if(b&&o)if(e.heapSize>0){const m=e.heapSize*r+(e.heapSize-1)*c+x*2;b.style.transform=`translate3d(${-x}px, 0, 0)`,b.style.width=`${m}px`,b.style.opacity="1",o.style.opacity="1"}else b.style.width="0px",b.style.opacity="0",o.style.opacity="0.25";if(u&&g){const m=a-e.heapSize;if(m>0){const f=e.heapSize*(r+c)-x,k=m*r+(m-1)*c+x*2;u.style.transform=`translate3d(${f}px, 0, 0)`,u.style.width=`${k}px`,u.style.opacity="1",g.style.opacity="1"}else u.style.transform=`translate3d(${i}px, 0, 0)`,u.style.width="0px",u.style.opacity="0",g.style.opacity="0.3"}if(y)if(e.heapSize>0&&e.heapSize<a){const m=e.heapSize*(r+c)-c/2-1.5;y.style.transform=`translate3d(${m}px, 0, 0)`,y.style.opacity="1"}else{const m=e.heapSize===0?-4:i+4;y.style.transform=`translate3d(${m}px, 0, 0)`,y.style.opacity="0"}Le(e,r,c),Pe(e),Oe(),bt()}function Fe(){qt();const t=n.heapFrames[0].items;n.heapPrevPosById.clear(),n.heapFrames[n.heapStep].items.forEach((a,i)=>n.heapPrevPosById.set(a.id,i)),zt(t),Vt(t),Wt(),n.heapResizeObserver&&(n.heapResizeObserver.disconnect(),n.heapResizeObserver=null);const e=document.getElementById("heap-tree-stage"),s=document.getElementById("heap-array-track");if(typeof ResizeObserver<"u"&&(e||s)){let a=null;n.heapResizeObserver=new ResizeObserver(()=>{a&&cancelAnimationFrame(a),a=requestAnimationFrame(()=>{H[n.slideIndex]?.id===15&&(kt(),W(!1))})}),e&&n.heapResizeObserver.observe(e),s&&n.heapResizeObserver.observe(s)}requestAnimationFrame(()=>{H[n.slideIndex]?.id===15&&(kt(),W(!1))})}function q(){n.heapTimer!==null&&(clearTimeout(n.heapTimer),n.heapTimer=null),n.heapPlaying=!1,bt()}function Gt(){if(!n.heapPlaying)return;const t=n.heapFrames.length-1,e=Math.round(1350/n.heapSpeed);n.heapTimer=setTimeout(()=>{n.heapPlaying&&(n.heapStep<t?(n.heapStep+=1,W(!0),n.heapStep>=t?q():Gt()):q())},e)}function Qt(){const t=n.heapFrames.length-1;if(n.heapPlaying){q();return}n.heapStep>=t&&(n.heapStep=0,W(!0)),n.heapPlaying=!0,bt(),n.heapTimer=setTimeout(()=>{n.heapPlaying&&(n.heapStep<t?(n.heapStep+=1,W(!0),n.heapStep<t?Gt():q()):q())},150)}function K(t){q();const e=n.heapFrames.length-1,s=Math.max(0,Math.min(t,e));s!==n.heapStep&&(n.heapStep=s,W(!0))}function St(t,e){q(),Z(null),n.heapRawArray=[...t],n.heapIsSample=e,n.heapFrames=$t(t),n.heapStep=0,n.heapPrevPosById.clear();const s=n.heapFrames[0].items;s.forEach((a,i)=>n.heapPrevPosById.set(a.id,i)),zt(s),Vt(s),Wt(),W(!1)}const D=[{label:"Mảng gốc",heap:[4,10,3,5,1],sorted:[],rootHighlight:!1,focus:null},{label:"Build Max-Heap",heap:[10,5,3,4,1],sorted:[],rootHighlight:!0,focus:"build"},{label:"Extract lần 1",heap:[5,4,3,1],sorted:[10],rootHighlight:!0,focus:"extract"},{label:"Extract lần 2",heap:[4,1,3],sorted:[5,10],rootHighlight:!0,focus:"extract"},{label:"Hoàn tất",heap:[],sorted:[1,3,4,5,10],rootHighlight:!1,focus:null}];function Xt(t){const e=t.heap.map((i,c)=>`<span class="hs16-cell${c===0&&t.rootHighlight?" root":""}">${i}</span>`).join(""),s=t.heap.length&&t.sorted.length?'<span class="hs16-divider">|</span>':"",a=t.sorted.map(i=>`<span class="hs16-cell sorted">${i}</span>`).join("");return`${e}${s}${a}`}function vt(){const t=document.getElementById("hs16-code-body");if(!t)return;const e=n.hs16FocusGroup;t.className=`hs16-code-body${e?` has-focus focus-${e}`:""}`,document.querySelectorAll(".hs16-card").forEach(r=>{r.classList.toggle("active",r.dataset.target===e)});const s=D[n.hs16StepIdx]||D[0],a=document.getElementById("hs16-step-label"),i=document.getElementById("hs16-arr-wrap"),c=document.getElementById("hs16-next-step-btn");a&&(a.textContent=s.label),i&&(i.innerHTML=Xt(s)),c&&(c.textContent=n.hs16StepIdx===D.length-1?"Chạy lại ↺":"Bước tiếp theo ▸")}function et(t){n.hs16FocusGroup=n.hs16FocusGroup===t?null:t,vt()}function _e(){n.hs16FocusGroup=null,vt()}function je(){n.hs16StepIdx=(n.hs16StepIdx+1)%D.length;const t=D[n.hs16StepIdx].focus;n.hs16FocusGroup=t||null,vt()}function qe(){const t=n.hs16FocusGroup,e=D[n.hs16StepIdx]||D[0],s=t?` has-focus focus-${t}`:"",a=n.hs16StepIdx===D.length-1?"Chạy lại ↺":"Bước tiếp theo ▸";return`
    <div class="hs16-grid">
      <div class="hs16-code-window bento-item" style="--stagger:0">
        <div class="hs16-code-topbar">
          <div class="hs16-dots">
            <span class="hs16-dot r"></span>
            <span class="hs16-dot y"></span>
            <span class="hs16-dot g"></span>
          </div>
          <span>heapsort_iterative.py</span>
          <span class="hs16-lang-badge">PYTHON</span>
        </div>

        <div class="hs16-code-body${s}" id="hs16-code-body">
          <div class="hs16-code-line"><span class="hs16-kw">def</span> <span class="hs16-fn">sift_down</span>(arr, n, i):</div>
          <div class="hs16-code-line" data-group="iter">    <span class="hs16-kw">while True</span>:  <span class="hs16-cm"># Khử đệ quy -&gt; O(1) RAM</span></div>
          <div class="hs16-code-line" data-group="iter">        largest = i</div>
          <div class="hs16-code-line" data-group="iter">        left, right = <span class="hs16-num">2</span> * i + <span class="hs16-num">1</span>, <span class="hs16-num">2</span> * i + <span class="hs16-num">2</span></div>
          <div class="hs16-code-line" data-group="iter">        <span class="hs16-kw">if</span> left &lt; n <span class="hs16-kw">and</span> arr[left] &gt; arr[largest]: largest = left</div>
          <div class="hs16-code-line" data-group="iter">        <span class="hs16-kw">if</span> right &lt; n <span class="hs16-kw">and</span> arr[right] &gt; arr[largest]: largest = right</div>
          <div class="hs16-code-line" data-group="iter">        <span class="hs16-kw">if</span> largest == i: <span class="hs16-kw">break</span></div>
          <div class="hs16-code-line" data-group="iter">        arr[i], arr[largest] = arr[largest], arr[i]</div>
          <div class="hs16-code-line" data-group="iter">        i = largest  <span class="hs16-cm"># Trượt trực tiếp xuống nút con</span></div>
          <div class="hs16-code-line"> </div>
          <div class="hs16-code-line"><span class="hs16-kw">def</span> <span class="hs16-fn">heap_sort</span>(arr):</div>
          <div class="hs16-code-line">    n = <span class="hs16-fn">len</span>(arr)</div>
          <div class="hs16-code-line" data-group="build">    <span class="hs16-kw">for</span> i <span class="hs16-kw">in</span> <span class="hs16-fn">range</span>(n // <span class="hs16-num">2</span> - <span class="hs16-num">1</span>, -<span class="hs16-num">1</span>, -<span class="hs16-num">1</span>):</div>
          <div class="hs16-code-line" data-group="build">        <span class="hs16-fn">sift_down</span>(arr, n, i)</div>
          <div class="hs16-code-line"> </div>
          <div class="hs16-code-line" data-group="extract">    <span class="hs16-kw">for</span> i <span class="hs16-kw">in</span> <span class="hs16-fn">range</span>(n - <span class="hs16-num">1</span>, <span class="hs16-num">0</span>, -<span class="hs16-num">1</span>):</div>
          <div class="hs16-code-line" data-group="extract">        arr[<span class="hs16-num">0</span>], arr[i] = arr[i], arr[<span class="hs16-num">0</span>]</div>
          <div class="hs16-code-line" data-group="extract">        <span class="hs16-fn">sift_down</span>(arr, i, <span class="hs16-num">0</span>)</div>
        </div>

        <div class="hs16-console-bar">
          <div class="hs16-console-left">
            <span class="hs16-step-label" id="hs16-step-label">${z(e.label)}</span>
            <div class="hs16-arr-wrap" id="hs16-arr-wrap">${Xt(e)}</div>
          </div>
          <button type="button" class="hs16-step-btn" id="hs16-next-step-btn" data-action="hs16-next-step">${a}</button>
        </div>
      </div>

      <div class="hs16-cards bento-item" style="--stagger:1">
        <div class="hs16-card${t==="iter"?" active":""}" data-action="hs16-focus" data-target="iter">
          <span class="hs16-hotkey-hint">Phím 1</span>
          <span class="hs16-badge gold">Điểm nhấn kỹ thuật: while True</span>
          <h3>Khử đệ quy triệt tiêu Stack Overflow</h3>
          <p>Thay vì gọi đệ quy <code>sift_down</code> tốn Call Stack, vòng lặp trượt trực tiếp <code>i = largest</code> xuống nút con, đạt chuẩn <strong>O(1) RAM phụ</strong> tuyệt đối.</p>
        </div>

        <div class="hs16-card${t==="build"?" active":""}" data-action="hs16-focus" data-target="build">
          <span class="hs16-hotkey-hint">Phím 2</span>
          <span class="hs16-badge blue">Vòng lặp 1 — O(n)</span>
          <h3>Build Max-Heap từ dưới lên</h3>
          <p>Chỉ duyệt ngược từ nút cha cuối cùng <code>n // 2 - 1</code> về <code>0</code> (bỏ qua toàn bộ nút lá từ <code>n // 2</code> trở đi).</p>
        </div>

        <div class="hs16-card${t==="extract"?" active":""}" data-action="hs16-focus" data-target="extract">
          <span class="hs16-hotkey-hint">Phím 3</span>
          <span class="hs16-badge green">Vòng lặp 2 — O(n log n)</span>
          <h3>Rút đỉnh (Extract) &amp; Thu hẹp Heap</h3>
          <p>Hoán đổi đỉnh lớn nhất <code>arr[0]</code> về cuối mảng <code>arr[i]</code>, sau đó gọi <code>sift_down(arr, i, 0)</code> để khôi phục Heap trên phần còn lại.</p>
        </div>
      </div>
    </div>
  `}const De=[3,2,1,5,6,4],F=[{currIdx:-1,skipped:[],doneIn:[0,1],heap:[2,3],line:"init",kicked:"Khởi tạo 2 số đầu",msg:"Lấy <strong>[3, 2]</strong> và <code>heapify</code> → đỉnh gác cổng <code>min_heap[0] = 2</code>."},{currIdx:2,skipped:[2],doneIn:[0,1],heap:[2,3],line:"check",kicked:'<span class="out">Bỏ qua 1</span> (1 ≤ 2)',msg:"Xét <strong>1</strong>: Nhỏ hơn gác cổng <strong>2</strong> → Bỏ qua, không cần đụng vào Heap."},{currIdx:3,skipped:[2],doneIn:[0,1,3],heap:[3,5],line:"replace",kicked:'Đá <span class="out">2</span> • Nạp <span class="in">5</span>',msg:"Xét <strong>5</strong>: Lớn hơn <strong>2</strong> → <code>heapreplace</code> đá 2 ra, nạp 5 vào."},{currIdx:4,skipped:[2],doneIn:[0,1,3,4],heap:[5,6],line:"replace",kicked:'Đá <span class="out">3</span> • Nạp <span class="in">6</span>',msg:"Xét <strong>6</strong>: Lớn hơn <strong>3</strong> → <code>heapreplace</code> đá 3 ra, nạp 6 vào."},{currIdx:5,skipped:[2,5],doneIn:[0,1,3,4],heap:[5,6],line:"check",kicked:'<span class="out">Bỏ qua 4</span> (4 ≤ 5)',msg:"Xét <strong>4</strong>: Nhỏ hơn gác cổng <strong>5</strong> → Bỏ qua."},{currIdx:-1,skipped:[2,5],doneIn:[0,1,3,4],heap:[5,6],line:"return",winner:!0,kicked:'Đáp án: <span class="in">5</span>',msg:"Hoàn tất! Trả về <code>min_heap[0] = 5</code> chính là <strong>số lớn thứ 2</strong>."}];function Jt(t){return De.map((e,s)=>{let a="hs17-num-cell";return s===t.currIdx?a+=" current":t.skipped.includes(s)?a+=" skipped":t.doneIn.includes(s)&&(a+=" done-in"),`<div class="${a}">${e}</div>`}).join("")}function Ut(t){return t.heap.map((e,s)=>{let a="hs17-heap-slot",i=`min_heap[${s}]`;return s===0&&(a+=t.winner?" winner":" gatekeeper",i=t.winner?"★ Đáp án (Top-2)":"Gác cổng [0]"),`<div class="${a}"><div class="hs17-slot-val">${e}</div><span class="hs17-slot-tag">${i}</span></div>`}).join("")}function ze(){const t=n.hs17IsDos,e=document.getElementById("hs17-dos-btn"),s=document.getElementById("hs17-qs-bar"),a=document.getElementById("hs17-qs-status"),i=document.getElementById("hs17-hs-status"),c=document.getElementById("hs17-dos-note");!e||!s||!a||!i||!c||(e.classList.toggle("active",t),s.classList.toggle("overflow",t),t?(a.className="hs17-status-pill panic",a.textContent="> 16 KB — KERNEL PANIC!",i.textContent="O(1) RAM — Miễn nhiễm",c.textContent="Đầu vào xấu: QuickSort đệ quy làm sập hệ thống!",e.textContent="↺ Khôi phục trạng thái [D]"):(a.className="hs17-status-pill warn",a.textContent="~4 KB (Bình thường)",i.textContent="O(1) RAM — An toàn",c.textContent="Trạng thái: Đầu vào ngẫu nhiên",e.textContent="⚡ Mô phỏng DoS O(n²) [D]"))}function Ke(){const t=F[n.hs17LcIdx]||F[0],e=document.getElementById("hs17-step-counter"),s=document.getElementById("hs17-stream-wrap"),a=document.getElementById("hs17-heap-slots"),i=document.getElementById("hs17-kicked-info"),c=document.getElementById("hs17-sim-msg"),r=document.getElementById("hs17-next-lc-btn");e&&(e.textContent=`Bước ${n.hs17LcIdx+1} / ${F.length}`),document.querySelectorAll("#hs17-lc-code .hs17-code-line").forEach(p=>{p.classList.toggle("hl",p.dataset.line===t.line)}),s&&(s.innerHTML=Jt(t)),a&&(a.innerHTML=Ut(t)),i&&(i.innerHTML=t.kicked),c&&(c.innerHTML=t.msg),r&&(r.textContent=n.hs17LcIdx===F.length-1?"Chạy lại ↺ [K]":"Bước tiếp theo ▸ [K]")}function Yt(){n.hs17IsDos=!n.hs17IsDos,ze()}function Zt(){n.hs17LcIdx=(n.hs17LcIdx+1)%F.length,Ke()}const U=[{cls:"l0",label:"Đỉnh (1 nút)",steps:"≤ log n bước",note:"<strong>Đỉnh (1 nút):</strong> Chỉ có duy nhất 1 nút phải trượt hết chiều cao log₂n."},{cls:"l1",label:"12.5% số nút",steps:"≤ 2 bước",note:"<strong>Tầng trên (12.5% số nút):</strong> Số lượng ít, chỉ trượt tối đa 2 tầng."},{cls:"l2",label:"25% số nút",steps:"≤ 1 bước",note:"<strong>Tầng áp đáy (25% số nút):</strong> Nhiều nút hơn nhưng chỉ trượt tối đa 1 bước."},{cls:"l3",label:"50% số nút (Nút lá)",steps:"0 bước",note:"<strong>Tầng đáy (50% số nút là lá):</strong> Không cần sift_down → 0 bước. Tổng chuỗi hội tụ = O(n)!"}],gt={distinct:"Với mảng phân biệt (kể cả đã sắp xếp sẵn), Heap Sort vẫn mất <code>Θ(n log n)</code> vì luôn phải rút đỉnh và đẩy phần tử nhỏ từ đáy lên để <code>sift_down</code> lại.",equal:"Khi mọi phần tử bằng nhau (VD: <code>[5, 5, 5, 5]</code>), <code>sift_down</code> thoát ngay ở lệnh <code>break</code> đầu tiên (O(1)/lần) → tổng thời gian giảm xuống <code>Θ(n)</code>."},ot={1:{n:"100",mW:"18%",mV:"~800 Bytes",qW:"10%",qV:"~500 Bytes"},2:{n:"10,000",mW:"48%",mV:"~80 KB",qW:"22%",qV:"~1.2 KB"},3:{n:"100,000",mW:"75%",mV:"~800 KB",qW:"34%",qV:"~1.6 KB (Worst: 800 KB)"},4:{n:"1,000,000",mW:"100%",mV:"~8 MB",qW:"46%",qV:"~2 KB (Worst: 8 MB)"}};function te(t){n.hs17PyramidLvl=t,document.querySelectorAll("#hs17c-pyramid .hs17c-p-level").forEach((s,a)=>{s.classList.toggle("active",a===t)});const e=document.getElementById("hs17c-p-note");e&&U[t]&&(e.innerHTML=U[t].note)}function Ve(t){n.hs17BestCase=t,document.querySelectorAll(".hs17c-tab-btn").forEach(s=>{s.classList.toggle("active",s.dataset.case===t)});const e=document.getElementById("hs17c-case-detail");e&&gt[t]&&(e.innerHTML=gt[t])}function We(){const t=ot[n.hs17RamScale]||ot[2],e=document.getElementById("hs17c-n-display"),s=document.getElementById("hs17c-merge-bar"),a=document.getElementById("hs17c-quick-bar"),i=document.getElementById("hs17c-merge-val"),c=document.getElementById("hs17c-quick-val");e&&(e.textContent=t.n),s&&(s.style.width=t.mW),a&&(a.style.width=t.qW),i&&(i.textContent=t.mV),c&&(c.textContent=t.qV)}function Ge(){const t=n.hs17PyramidLvl,e=(U[t]||U[3]).note,s=n.hs17BestCase||"distinct",a=ot[n.hs17RamScale]||ot[2];return`
    <div class="hs17c-wrap">
      <div class="hs17c-kpi-grid bento-item" style="--stagger:0">
        <div class="hs17c-kpi-card">
          <span class="hs17c-badge green">Build Max-Heap</span>
          <div class="hs17c-kpi-val">O(n)</div>
          <div class="hs17c-kpi-sub">Một nửa số nút là lá có chiều cao 0.</div>
        </div>
        <div class="hs17c-kpi-card">
          <span class="hs17c-badge gold">Worst &amp; Average</span>
          <div class="hs17c-kpi-val">O(n log n)</div>
          <div class="hs17c-kpi-sub">Rút gốc lặp <code>n - 1</code> lần × <code>O(log n)</code>.</div>
        </div>
        <div class="hs17c-kpi-card">
          <span class="hs17c-badge gold">Không gian Tuyệt đối</span>
          <div class="hs17c-kpi-val gold">O(1) RAM</div>
          <div class="hs17c-kpi-sub">Không mảng phụ, không Call Stack.</div>
        </div>
      </div>

      <div class="hs17c-main-grid">
        <div class="hs17c-panel bento-item" style="--stagger:1">
          <div class="hs17c-panel-title">
            <span>Tại sao Build Max-Heap chỉ tốn O(n)?</span>
            <span class="hs17c-badge green" style="margin:0">Di chuột vào từng tầng</span>
          </div>

          <div class="hs17c-pyramid-box">
            <div class="hs17c-pyramid-head">
              <span>Số lượng nút ở mỗi tầng</span>
              <span>Số bước trượt tối đa</span>
            </div>
            <div class="hs17c-pyramid" id="hs17c-pyramid">
              ${U.map((i,c)=>`
                <div class="hs17c-p-level ${i.cls}${c===t?" active":""}" data-action="hs17c-pyramid" data-level="${c}">
                  <span>${i.label}</span>
                  <span class="hs17c-p-steps">${i.steps}</span>
                </div>
              `).join("")}
            </div>
            <div class="hs17c-p-note" id="hs17c-p-note">${e}</div>
          </div>

          <div class="hs17c-case-box">
            <div class="hs17c-case-top">
              <span style="font-size:13px; font-weight:700;">Trường hợp tốt nhất (Best Case):</span>
              <div class="hs17c-case-tabs">
                <button type="button" class="hs17c-tab-btn${s==="distinct"?" active":""}" data-action="hs17c-case" data-case="distinct">Phần tử phân biệt</button>
                <button type="button" class="hs17c-tab-btn${s==="equal"?" active":""}" data-action="hs17c-case" data-case="equal">Bằng nhau [5,5,5,5]</button>
              </div>
            </div>
            <div class="hs17c-case-detail" id="hs17c-case-detail">${gt[s]}</div>
          </div>
        </div>

        <div class="hs17c-panel bento-item" style="--stagger:2">
          <div>
            <div class="hs17c-panel-title">
              <span>So sánh RAM phụ (In-place)</span>
              <span class="hs17c-badge gold" style="margin:0">Nhà vô địch RAM</span>
            </div>

            <div class="hs17c-slider-row">
              <label>Kích thước mảng: <strong id="hs17c-n-display">${a.n}</strong> phần tử</label>
              <input type="range" id="hs17c-n-slider" min="1" max="4" step="1" value="${n.hs17RamScale}" aria-label="Kích thước mảng so sánh RAM" />
            </div>

            <div class="hs17c-ram-bars">
              <div>
                <div class="hs17c-ram-item-head">
                  <span><strong>Merge Sort</strong> — Mảng phụ O(n)</span>
                  <span class="hs17c-ram-val" style="color:#fca5a5" id="hs17c-merge-val">${a.mV}</span>
                </div>
                <div class="hs17c-track"><div class="hs17c-fill merge" id="hs17c-merge-bar" style="width:${a.mW}"></div></div>
              </div>

              <div>
                <div class="hs17c-ram-item-head">
                  <span><strong>QuickSort</strong> — Call Stack O(log n) → O(n)</span>
                  <span class="hs17c-ram-val" style="color:#f5c542" id="hs17c-quick-val">${a.qV}</span>
                </div>
                <div class="hs17c-track"><div class="hs17c-fill quick" id="hs17c-quick-bar" style="width:${a.qW}"></div></div>
              </div>

              <div>
                <div class="hs17c-ram-item-head">
                  <span><strong>Heap Sort</strong> — Khử đệ quy O(1)</span>
                  <span class="hs17c-ram-val" style="color:#4ade80" id="hs17c-heap-val">32 Bytes (Cố định)</span>
                </div>
                <div class="hs17c-track"><div class="hs17c-fill heap" id="hs17c-heap-bar" style="width:4%"></div></div>
              </div>
            </div>
          </div>

          <div class="hs17c-vars-box">
            <div><strong>Sắp xếp tại chỗ thuần túy:</strong> Dù mảng tăng lên hàng triệu phần tử, RAM phụ vẫn chỉ đúng 4 biến cục bộ:</div>
            <div class="hs17c-vars-pills">
              <span class="hs17c-vpill">i</span>
              <span class="hs17c-vpill">left</span>
              <span class="hs17c-vpill">right</span>
              <span class="hs17c-vpill">largest</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function Qe(){const t=n.hs17IsDos,e=F[n.hs17LcIdx]||F[0],s=t?"hs17-status-pill panic":"hs17-status-pill warn",a=t?"> 16 KB — KERNEL PANIC!":"~4 KB (Bình thường)",i=t?"O(1) RAM — Miễn nhiễm":"O(1) RAM — An toàn",c=t?"Đầu vào xấu: QuickSort đệ quy làm sập hệ thống!":"Trạng thái: Đầu vào ngẫu nhiên",r=t?"↺ Khôi phục trạng thái [D]":"⚡ Mô phỏng DoS O(n²) [D]",p=n.hs17LcIdx===F.length-1?"Chạy lại ↺ [K]":"Bước tiếp theo ▸ [K]";return`
    <div class="hs17-grid">
      <div class="hs17-left-col bento-item" style="--stagger:0">
        <div class="hs17-card">
          <div>
            <div class="hs17-card-top">
              <span class="hs17-badge gold">1. Linux Kernel &amp; Hệ thống nhúng</span>
              <span class="hs17-meta-tag">lib/sort.c</span>
            </div>
            <div class="hs17-big-stat">8–16 KB Stack</div>
            <div class="hs17-sub-title">Tại sao <code>linux/lib/sort.c</code> chọn Heap Sort?</div>
          </div>

          <div class="hs17-meter-box">
            <div class="hs17-meter-row">
              <div class="hs17-meter-label">
                <span><strong>QuickSort</strong> (Đệ quy)</span>
                <span class="${s}" id="hs17-qs-status">${a}</span>
              </div>
              <div class="hs17-track">
                <div class="hs17-limit-tag">Giới hạn 16 KB</div>
                <div class="hs17-limit-line"></div>
                <div class="hs17-bar qs${t?" overflow":""}" id="hs17-qs-bar"></div>
              </div>
            </div>

            <div class="hs17-meter-row">
              <div class="hs17-meter-label">
                <span><strong>Heap Sort</strong> (Khử đệ quy)</span>
                <span class="hs17-status-pill safe" id="hs17-hs-status">${i}</span>
              </div>
              <div class="hs17-track">
                <div class="hs17-limit-line"></div>
                <div class="hs17-bar hs" id="hs17-hs-bar"></div>
              </div>
            </div>

            <div class="hs17-dos-controls">
              <span class="hs17-dos-note" id="hs17-dos-note">${c}</span>
              <button type="button" class="hs17-btn danger${t?" active":""}" id="hs17-dos-btn" data-action="hs17-toggle-dos">${r}</button>
            </div>
          </div>
        </div>

        <div class="hs17-card hs17-lc-summary">
          <div>
            <div class="hs17-card-top">
              <span class="hs17-badge blue">2. Priority Queue • LeetCode 215</span>
              <span class="hs17-meta-tag">O(n log k)</span>
            </div>
            <h3>Kth Largest Element in an Array</h3>
            <p>Giữ một <strong>Hộp Min-Heap cố định k phần tử</strong>. Đỉnh <code>min_heap[0]</code> đóng vai trò <strong>"người gác cổng"</strong> — chỉ số nào lớn hơn nó mới được đá nó ra để vào Top-K.</p>
          </div>
          <div class="hs17-compare-pills">
            <span class="hs17-cpill bad">Sort cả mảng: O(n log n)</span>
            <span class="hs17-cpill good">Min-Heap k phần tử: O(n log k)</span>
          </div>
        </div>
      </div>

      <div class="hs17-right-panel bento-item" style="--stagger:1">
        <div class="hs16-code-topbar">
          <div class="hs16-dots">
            <span class="hs16-dot r"></span>
            <span class="hs16-dot y"></span>
            <span class="hs16-dot g"></span>
          </div>
          <span>leetcode_215_kth_largest.py</span>
          <span class="hs16-lang-badge">PYTHON</span>
        </div>

        <div class="hs17-code-body" id="hs17-lc-code">
          <div class="hs17-code-line"><span class="hs16-kw">import</span> heapq</div>
          <div class="hs17-code-line"><span class="hs16-kw">def</span> <span class="hs16-fn">findKthLargest</span>(nums: list[int], k: int) -&gt; int:</div>
          <div class="hs17-code-line${e.line==="init"?" hl":""}" data-line="init">    min_heap = nums[:k]</div>
          <div class="hs17-code-line${e.line==="init"?" hl":""}" data-line="init">    heapq.<span class="hs16-fn">heapify</span>(min_heap)            <span class="hs16-cm"># Build Heap O(k)</span></div>
          <div class="hs17-code-line${e.line==="check"?" hl":""}" data-line="check">    <span class="hs16-kw">for</span> num <span class="hs16-kw">in</span> nums[k:]:</div>
          <div class="hs17-code-line${e.line==="check"?" hl":""}" data-line="check">        <span class="hs16-kw">if</span> num &gt; min_heap[0]:          <span class="hs16-cm"># So với "gác cổng"</span></div>
          <div class="hs17-code-line${e.line==="replace"?" hl":""}" data-line="replace">            heapq.<span class="hs16-fn">heapreplace</span>(min_heap, num)  <span class="hs16-cm"># Đá đỉnh &amp; nạp mới</span></div>
          <div class="hs17-code-line${e.line==="return"?" hl":""}" data-line="return">    <span class="hs16-kw">return</span> min_heap[0]</div>
        </div>

        <div class="hs17-sim-area">
          <div class="hs17-sim-header">
            <span class="hs17-sim-title">Mô phỏng trực quan: k = 2 (Tìm số lớn thứ 2)</span>
            <span class="hs17-meta-tag" id="hs17-step-counter">Bước ${n.hs17LcIdx+1} / ${F.length}</span>
          </div>

          <div class="hs17-stream-row">
            <span class="hs17-row-label">Mảng nums:</span>
            <div id="hs17-stream-wrap" style="display:flex; gap:6px;">${Jt(e)}</div>
          </div>

          <div class="hs17-heap-stage">
            <span class="hs17-row-label" style="min-width:78px;">Min-Heap<br><small style="color:#38bdf8">(size = 2)</small></span>
            <div class="hs17-heap-slots" id="hs17-heap-slots">${Ut(e)}</div>
            <div class="hs17-kicked-info" id="hs17-kicked-info">${e.kicked}</div>
          </div>

          <div class="hs17-sim-footer">
            <div class="hs17-sim-msg" id="hs17-sim-msg">${e.msg}</div>
            <button type="button" class="hs17-btn" id="hs17-next-lc-btn" data-action="hs17-next-lc">${p}</button>
          </div>
        </div>
      </div>
    </div>
  `}function Xe(){return`
    <div class="bento-grid flex-1 min-h-0">
      <div class="bento-card summary-expanded-card col-12 bento-item" style="--stagger:0">
        <div class="flex-row justify-between items-center flex-wrap gap-2">
          <h3 class="bento-title">So sánh 5 Thuật toán Sắp xếp Cốt lõi</h3>
          <span class="badge-pill badge-blue">Đánh đổi Production: Thời gian • Bộ nhớ • Tính ổn định • Cache</span>
        </div>

        <div class="comparison-table-wrap">
          <table class="data-table data-table-expanded">
            <thead>
              <tr>
                <th>Thuật toán</th>
                <th>Tốt nhất</th>
                <th>Trung bình</th>
                <th>Xấu nhất</th>
                <th>Bộ nhớ phụ</th>
                <th>Ổn định</th>
                <th>Đặc tính &amp; Đánh đổi</th>
                <th>Ứng dụng tiêu biểu</th>
              </tr>
            </thead>
            <tbody>
              ${re.map(t=>{const e=t.best==="Θ(n)"?"color:#30D158;font-weight:700;":"",s=t.worst==="Θ(n²)"?"color:#FF6961;font-weight:700;":"",a=t.space==="O(1)"?"color:#FFD60A;font-weight:700;":t.space==="Θ(log n)"?"color:#DF9EFF;font-weight:700;":"",i=t.stable==="Có"?'<span style="color:#30D158;font-weight:700">Có</span>':'<span style="color:#A1A1A6;">Không</span>';return`
                  <tr class="row-theme-${t.theme}">
                    <td class="cell-nowrap">
                      <div class="algo-name">${t.name}</div>
                      <div class="algo-mechanism">${t.mechanism}</div>
                    </td>
                    <td class="mono cell-nowrap" style="${e}">${t.best}</td>
                    <td class="mono cell-nowrap">${t.average}</td>
                    <td class="mono cell-nowrap" style="${s}">${t.worst}</td>
                    <td class="mono cell-nowrap" style="${a}">${t.space}</td>
                    <td class="cell-nowrap">${i}</td>
                    <td>${t.tradeoff}</td>
                    <td>${t.apps}</td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>

        <div class="summary-footer-bar">
          <span class="bento-caption">* Heap Sort đạt Best Case <code>Θ(n)</code> khi toàn bộ phần tử trong mảng bằng nhau.</span>
          <div class="flex-row gap-2 flex-wrap">
            <span class="badge-pill badge-mint">Timsort: Stable &amp; Natural Runs</span>
            <span class="badge-pill badge-purple">Introsort: Tốc độ RAM &amp; An toàn</span>
            <span class="badge-pill badge-amber">Heap Sort: O(1) RAM &amp; Không Stack</span>
          </div>
        </div>
      </div>
    </div>
  `}function ee(t){switch(t.id){case 1:return ue();case 2:return me();case 3:return be();case 4:return ye();case 5:return fe();case 6:return xe();case 7:return ke();case 8:return Se();case 9:return we();case 10:return Te();case 11:return Ae();case 12:return He();case 13:return Me();case 14:return Ne();case 15:return Re();case 16:return qe();case 17:return Ge();case 18:return Qe();case 19:return Xe();default:return""}}function Je(){_(),j(),q()}function Ue(t,e){if(t.id===1)return"";const s=t.id===4?It():t.id===15?jt():t.subtitle;return`
    <header class="slide-header">
      <h1 class="slide-title">${t.title}</h1>
      <div class="slide-meta-row">
        <p class="slide-subtitle">${s}</p>
        <span class="slide-kicker">Slide ${String(t.id).padStart(2,"0")} / ${e} • ${t.duration}</span>
      </div>
    </header>
  `}function Ye(t){return n.showNotes?`
    <aside class="speaker-drawer" aria-label="Speaker Notes">
      <div class="speaker-drawer-header">
        <div class="flex-row gap-2">
          ${Q.notes}
          <strong style="font-size:0.95rem;">Speaker Notes — Slide ${t.id}</strong>
          <span class="badge-pill badge-accent">${t.duration}</span>
        </div>
        <button type="button" class="sim-btn" data-action="toggle-notes">Đóng (S)</button>
      </div>
      <div class="speaker-drawer-body">${t.speakerNotes}</div>
    </aside>
  `:""}function Ze(){const t=document.getElementById("root"),e=H.length;t.innerHTML=`
    <div id="app-shell" class="app-shell theme-hero">
      <div class="ambient-glow"></div>

      <div class="top-island-wrap">
        <header class="dynamic-island">
          <div class="brand-badge">
            <span class="brand-dot"></span>
            <span>DSA Sorting</span>
          </div>

          <nav id="chapter-nav" class="chapter-nav" aria-label="Chapters">
            ${se.map(s=>{const a=s.range[0]===s.range[1]?s.range[0]:`${s.range[0]}–${s.range[1]}`;return`
                <button type="button" class="chapter-btn" data-chapter="${s.id}" data-action="jump-slide" data-slide="${s.firstSlide-1}">
                  <span>${s.label}</span>
                  <span class="chapter-range">${a}</span>
                </button>
              `}).join("")}
          </nav>

          <div class="nav-actions">
            <button id="prev-slide-btn" type="button" class="nav-pill-btn icon-only" data-action="prev-slide" title="Slide trước (←)">
              ${Q.chevronLeft}
            </button>
            <span id="slide-counter" class="slide-counter">01 / ${e}</span>
            <button id="next-slide-btn" type="button" class="nav-pill-btn icon-only" data-action="next-slide" title="Slide tiếp (→)">
              ${Q.chevronRight}
            </button>
            <button id="notes-toggle-btn" type="button" class="nav-pill-btn" data-action="toggle-notes" title="Speaker Notes (S)">
              ${Q.notes}
              <span>Notes (S)</span>
            </button>
            <button type="button" class="nav-pill-btn icon-only" data-action="toggle-fullscreen" title="Toàn màn hình (F)">
              ${Q.fullscreen}
            </button>
          </div>
        </header>
      </div>

      <main class="stage-shell">
        <section id="slide-canvas" class="slide-canvas">
          <div id="slide-header-slot"></div>
          <div id="slide-body-slot" class="slide-body"></div>
        </section>
      </main>

      <div id="speaker-drawer-slot"></div>

      <div class="bottom-progress-track" aria-hidden="true">
        <div id="progress-fill" class="bottom-progress-fill" style="width:0%"></div>
      </div>
    </div>
  `}function yt(){const t=H[n.slideIndex],e=document.getElementById("notes-toggle-btn"),s=document.getElementById("speaker-drawer-slot");e&&e.classList.toggle("active",n.showNotes),s&&(s.innerHTML=Ye(t))}function tn(){const t=H[n.slideIndex],e=document.getElementById("slide-body-slot");e&&(e.classList.remove("animate-stagger"),e.innerHTML=ee(t))}function ne(t=!0){const e=H[n.slideIndex],s=H.length,a=(n.slideIndex+1)/s*100,i=document.getElementById("app-shell");i&&(i.className=`app-shell theme-${e.theme}`),document.querySelectorAll("#chapter-nav .chapter-btn").forEach(b=>{b.classList.toggle("active",b.dataset.chapter===e.chapter)});const c=document.getElementById("slide-counter");c&&(c.textContent=`${String(n.slideIndex+1).padStart(2,"0")} / ${s}`);const r=document.getElementById("progress-fill");r&&(r.style.width=`${a}%`);const p=document.getElementById("prev-slide-btn");p&&(p.disabled=n.slideIndex===0);const d=document.getElementById("next-slide-btn");d&&(d.disabled=n.slideIndex===s-1);const l=document.getElementById("slide-header-slot");l&&(l.innerHTML=Ue(e,s)),n.introResizeObserver&&(n.introResizeObserver.disconnect(),n.introResizeObserver=null),n.heapResizeObserver&&(n.heapResizeObserver.disconnect(),n.heapResizeObserver=null);const h=document.getElementById("slide-body-slot");h&&(h.classList.remove("animate-stagger"),h.innerHTML=ee(e),t&&(h.offsetWidth,h.classList.add("animate-stagger"))),e.id===10?Be():e.id===15&&Fe(),yt()}function Y(t){Je();const e=Math.max(0,Math.min(H.length-1,t));e!==n.slideIndex&&(n.slideIndex=e,ne(!0))}document.addEventListener("click",t=>{const e=t.target.closest("[data-action]");if(!e)return;switch(e.dataset.action){case"next-slide":Y(n.slideIndex+1);break;case"prev-slide":Y(n.slideIndex-1);break;case"jump-slide":Y(Number(e.dataset.slide));break;case"toggle-notes":n.showNotes=!n.showNotes,yt();break;case"toggle-fullscreen":document.fullscreenElement?document.exitFullscreen?.().catch(()=>{}):document.documentElement.requestFullscreen?.().catch(()=>{});break;case"tim-prev":Nt();break;case"tim-next":Mt();break;case"tim-reset":xt(lt);break;case"tim-random":xt(le());break;case"tim-auto":Ht();break;case"java-tab":n.javaTab=e.dataset.tab,tn();break;case"intro-tab":pt(e.dataset.tab);break;case"intro-prev":P(n.introStep-1);break;case"intro-next":P(n.introStep+1);break;case"intro-reset":P(0);break;case"intro-auto":_t();break;case"heap-prev":K(n.heapStep-1);break;case"heap-next":K(n.heapStep+1);break;case"heap-reset":K(0);break;case"heap-sample":St(ct,!0);break;case"heap-random":St(pe(),!1);break;case"heap-auto":Qt();break;case"hs16-focus":et(e.dataset.target);break;case"hs16-next-step":je();break;case"hs17-toggle-dos":Yt();break;case"hs17-next-lc":Zt();break;case"hs17c-pyramid":te(Number(e.dataset.level));break;case"hs17c-case":Ve(e.dataset.case);break}});document.addEventListener("mouseover",t=>{const e=t.target.closest('[data-action="hs17c-pyramid"]');e&&te(Number(e.dataset.level))});document.addEventListener("input",t=>{if(t.target?.id==="tim-speed-slider"){n.timsortSpeed=Number(t.target.value);const e=document.getElementById("tim-speed-label");e&&(e.textContent=nt[n.timsortSpeed]?.label||"Vừa")}else t.target?.id==="intro-speed-slider"?(n.introSpeed=Number(t.target.value),Rt()):t.target?.id==="heap-speed-slider"?(n.heapSpeed=Number(t.target.value),qt()):t.target?.id==="hs17c-n-slider"&&(n.hs17RamScale=Number(t.target.value),We())});document.addEventListener("keydown",t=>{if(!["INPUT","TEXTAREA"].includes(t.target?.tagName)){if(H[n.slideIndex]?.id===4){if(t.key==="p"||t.key==="P"){t.preventDefault(),Ht();return}if(t.key===","||t.key==="["){t.preventDefault(),Nt();return}if(t.key==="."||t.key==="]"){t.preventDefault(),Mt();return}}else if(H[n.slideIndex]?.id===10){if(t.key==="p"||t.key==="P"){t.preventDefault(),_t();return}if(t.key===","||t.key==="["){t.preventDefault(),P(n.introStep-1);return}if(t.key==="."||t.key==="]"){t.preventDefault(),P(n.introStep+1);return}if(t.key==="1"){t.preventDefault(),pt("tab1");return}if(t.key==="2"){t.preventDefault(),pt("tab2");return}}else if(H[n.slideIndex]?.id===15){if(t.key==="p"||t.key==="P"){t.preventDefault(),Qt();return}if(t.key===","||t.key==="["){t.preventDefault(),K(n.heapStep-1);return}if(t.key==="."||t.key==="]"){t.preventDefault(),K(n.heapStep+1);return}if(t.key==="r"||t.key==="R"){t.preventDefault(),K(0);return}}else if(H[n.slideIndex]?.id===16){if(t.key==="1"){t.preventDefault(),et("iter");return}if(t.key==="2"){t.preventDefault(),et("build");return}if(t.key==="3"){t.preventDefault(),et("extract");return}if(t.key==="0"||t.key==="Escape"){t.preventDefault(),_e();return}}else if(H[n.slideIndex]?.id===18){if(t.key==="d"||t.key==="D"){t.preventDefault(),Yt();return}if(t.key==="k"||t.key==="K"){t.preventDefault(),Zt();return}}["ArrowRight","PageDown"," "].includes(t.key)?(t.preventDefault(),Y(n.slideIndex+1)):["ArrowLeft","PageUp"].includes(t.key)?(t.preventDefault(),Y(n.slideIndex-1)):t.key==="s"||t.key==="S"?(t.preventDefault(),n.showNotes=!n.showNotes,yt()):(t.key==="f"||t.key==="F")&&(t.preventDefault(),document.fullscreenElement?document.exitFullscreen?.().catch(()=>{}):document.documentElement.requestFullscreen?.().catch(()=>{}))}});Ze();ne(!0);
