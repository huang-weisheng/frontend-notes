# installer.nsh
!include "MUI2.nsh"
!include "nsDialogs.nsh"

Var Dialog
Var InputBox



# 调整页面顺序，把自定义页面放在选择安装类型之后
!insertmacro MUI_PAGE_WELCOME                    # 欢迎页面
Page custom myCustomPage myCustomPageLeave       # 自定义页面

# 创建页面
Function myCustomPage
    nsDialogs::Create 1018
    Pop $Dialog

    # 创建输入框 (x坐标, y坐标, 宽度, 高度, 默认文本)
    ${NSD_CreateText} 10 10 200 12u "默认内容"
    Pop $InputBox

    nsDialogs::Show
FunctionEnd

# 保存数据
Function myCustomPageLeave
    ${NSD_GetText} $InputBox $0  # $0 将存储输入的值
    # 确保安装目录存在
    CreateDirectory "$INSTDIR"
    # 把值写入文件
    FileOpen $4 "$INSTDIR\config.txt" w
    FileWrite $4 "$0"
    FileClose $4
FunctionEnd