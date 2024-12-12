# installer.nsh
!include "MUI2.nsh"
!include "nsDialogs.nsh"

Var Dialog
Var UrlLabel
Var UrlText
Var UrlValue

# 定义自定义页面
Page custom createUrlPage saveUrlPage

# 创建输入页面
Function createUrlPage
  nsDialogs::Create 1018
  Pop $Dialog
  
  ${NSD_CreateLabel} 0 0 100% 20u "请输入服务器地址:"
  Pop $UrlLabel
  
  ${NSD_CreateText} 0 20u 100% 12u ""
  Pop $UrlText
  
  nsDialogs::Show
FunctionEnd

# 保存用户输入
Function saveUrlPage
  ${NSD_GetText} $UrlText $UrlValue
  
  # 将URL保存到文件
  FileOpen $4 "$INSTDIR\config.json" w
  FileWrite $4 '{"serverUrl": "$UrlValue"}'
  FileClose $4
FunctionEnd