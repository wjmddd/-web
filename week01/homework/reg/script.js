function toggleCustomGender() {
    // 获取自定义性别的输入框
    const customGenderInput = document.getElementById('custom-gender');
    
    // 获取当前选中的性别选项
    const customGenderRadio = document.querySelector('input[name="gender"]:checked').value;
    
    // 如果选择的是"自定义"，显示输入框，否则隐藏
    if (customGenderRadio === '自定义') {
        customGenderInput.style.display = 'block';
    } else {
        customGenderInput.style.display = 'none';
    }
}

// 获取select元素
const yearSelect = document.getElementById('year');
const monthSelect = document.getElementById('month');
const daySelect = document.getElementById('day');

// 获取当前日期
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1; // getMonth() 返回 0-11，需要 +1
const currentDay = today.getDate();

// 添加年份选项（从当前年份往前推100年）
for (let year = currentYear; year >= currentYear - 150; year--) {
    let option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);

    // 设置默认年份为当前年份
    if (year === currentYear) {
        option.selected = true;
    }
}

// 添加月份选项（1月到12月）
for (let month = 1; month <= 12; month++) {
    let option = document.createElement('option');
    option.value = month;
    option.textContent = month + '月'; // 显示为“X月”
    monthSelect.appendChild(option);

    // 设置默认月份为当前月份
    if (month === currentMonth) {
        option.selected = true;
    }
}

// 根据月份动态生成天数
function populateDays(selectedMonth, selectedYear) {
    // 清空之前的天数
    daySelect.innerHTML = '<option value="">日期</option>';

    // 根据月份生成相应的天数
    let daysInMonth = 31;
    if (selectedMonth === 4 || selectedMonth === 6 || selectedMonth === 9 || selectedMonth === 11) {
        daysInMonth = 30; // 4月、6月、9月、11月为30天
    } else if (selectedMonth === 2) {
        // 检查是否为闰年，2月闰年29天，平年28天
        daysInMonth = (selectedYear % 4 === 0 && (selectedYear % 100 !== 0 || selectedYear % 400 === 0)) ? 29 : 28;
    }

    // 添加日期选项
    for (let day = 1; day <= daysInMonth; day++) {
        let option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);

        // 设置默认日期为当前日期
        if (day === currentDay) {
            option.selected = true;
        }
    }
}

// 当用户改变年份或月份时，重新生成天数
yearSelect.addEventListener('change', function() {
    const selectedYear = parseInt(this.value);
    const selectedMonth = parseInt(monthSelect.value);
    if (selectedMonth) {
        populateDays(selectedMonth, selectedYear);
    }
});

monthSelect.addEventListener('change', function() {
    const selectedMonth = parseInt(this.value);
    const selectedYear = parseInt(yearSelect.value);
    if (selectedYear) {
        populateDays(selectedMonth, selectedYear);
    }
});

// 初始加载时，默认填充当月的天数
populateDays(currentMonth, currentYear);


function validateForm() {
    // 获取表单输入的值
    const lastName = document.getElementById('lastName').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;

    // 验证姓
    if (!lastName) {
        document.getElementById('lastName').style.borderColor = 'red';
        document.getElementById('lastNameErrorIcon').style.display = 'block'; // 显示SVG图像
        isValid = false;
    } else {
        document.getElementById('lastName').style.borderColor = '';
        document.getElementById('lastNameErrorIcon').style.display = 'none'; // 隐藏SVG图像
    }

    // 验证名
    if (!firstName) {
        document.getElementById('firstName').style.borderColor = 'red';
        document.getElementById('firstNameErrorIcon').style.display = 'block'; // 显示SVG图像
        isValid = false;
    } else {
        document.getElementById('firstName').style.borderColor = '';
        document.getElementById('firstNameErrorIcon').style.display = 'none'; // 隐藏SVG图像
    }

    // 验证手机号或邮箱
    if (!email) {
        document.getElementById('email').style.borderColor = 'red';
        document.getElementById('emailErrorIcon').style.display = 'block'; // 显示SVG图像
        isValid = false;
    } else {
        document.getElementById('email').style.borderColor = '';
        document.getElementById('emailErrorIcon').style.display = 'none'; // 隐藏SVG图像
    }

    // 验证密码
    if (!password) {
        document.getElementById('password').style.borderColor = 'red';
        document.getElementById('passwordErrorIcon').style.display = 'block'; // 显示SVG图像
        isValid = false;
    } else {
        document.getElementById('password').style.borderColor = '';
        document.getElementById('passwordErrorIcon').style.display = 'none'; // 隐藏SVG图像
    }

    // 如果所有输入都有效，则提交表单
    if (isValid) {
        alert('表单验证通过，注册成功！');
        // 此处可以添加提交表单逻辑，例如使用 AJAX 发送数据到服务器
        // document.getElementById('yourFormId').submit(); // 如果是传统表单提交
    }
    return isValid;
}

// 获取SVG图标和提示框元素
const allElements = document.querySelectorAll('.info-icon');
const svgIcon1 = allElements[0];
const popover1 = document.getElementById('popover-info1');

// 为SVG图标添加点击事件监听器
svgIcon1.addEventListener('click', function(event) {
    event.stopPropagation(); // 阻止事件冒泡到document
    // 切换提示框的显示状态
    popover1.style.display = (popover1.style.display === 'none' || popover1.style.display === '') ? 'block' : 'none';
});

// 为document添加点击事件监听器
document.addEventListener('click', function() {
    // 如果点击的不是SVG图标或其内部元素，则隐藏提示框
    if (!svgIcon1.contains(event.target)) {
        popover1.style.display = 'none';
    }
});

const svgIcon2 = allElements[1];
const popover2 = document.getElementById('popover-info2');

// 为SVG图标添加点击事件监听器
svgIcon2.addEventListener('click', function(event) {
    event.stopPropagation(); // 阻止事件冒泡到document
    // 切换提示框的显示状态
    popover2.style.display = (popover2.style.display === 'none' || popover2.style.display === '') ? 'block' : 'none';
});

// 为document添加点击事件监听器
document.addEventListener('click', function() {
    // 如果点击的不是SVG图标或其内部元素，则隐藏提示框
    if (!svgIcon2.contains(event.target)) {
        popover2.style.display = 'none';
    }
});


function validateInput(inputElement) {
    const pattern = new RegExp(inputElement.getAttribute('pattern')); // 获取输入框的 pattern
    const errorMessage = inputElement.nextElementSibling; // 错误消息
    const errorIcon = errorMessage.nextElementSibling; // 错误图标 SVG

    // 检查输入是否符合 pattern
    if (!pattern.test(inputElement.value) || inputElement.value === '') {
        errorIcon.style.display = 'block'; // 显示错误图标
        inputElement.style.borderColor = 'red'; // 边框变红
    } else {
        errorMessage.style.display = 'none'; // 隐藏错误消息
        errorIcon.style.display = 'none'; // 隐藏错误图标
        inputElement.style.borderColor = ''; // 恢复默认边框颜色
    }
}


