import pandas as pd
demoData = pd.read_csv('demographic.csv')
dietData = pd.read_csv('diet.csv')
labData = pd.read_csv('labs.csv')

# List of columns to remove for demoData
demo_columns_to_remove = [
    'SDDSRVYR', 'RIDSTATR', 'RIDEXMON', 'SDMVPSU', 'SDMVSTRA', 'SIAINTRP',
    'SIALANG', 'SIAPROXY', 'MIAPROXY', 'MIALANG', 'MIAINTRP', 'FIAPROXY',
    'FIALANG', 'FIAINTRP', 'DMQMILIZ', 'DMQADFC', 'DMDYRSUS', 'DMDHSEDU',
    'DMDHRMAR', 'DMDMARTL', 'DMDHRBR4', 'DMDHHSZE', 'DMDHHSZB', 'DMDHHSZA',
    'DMDHHSIZ', 'DMDFMSIZ'
]
demoData = demoData.drop(columns=demo_columns_to_remove)
demoData.to_csv('new_demo.csv', index=False)

# List of columns to remove for dietData
dietData = diestData[[
    'column_name_1', 'column_name_2', 'column_name_3'
]]
dietData = dietData.drop(columns=diet_columns_to_remove)
dietData.to_csv('new_diet.csv', index=False)

# List of columns to keep from labData
labData = labData[[
    'column_name_1', 'column_name_2', 'column_name_3'
    ]]
labData = labData.drop(columns=lab_columns_to_remove)
labData.to_csv('new_lab.csv', index=False)

# Merge the two dataframes, using _ID column as key
# combData = pd.merge(demoData, labData, on = 'SEQN')
# combData.set_index('SEQN', inplace = True)

# Write it to a new CSV file
# combData.to_csv('./national-health-and-nutrition-examination-survey/combdata.csv')
# del combData['SDDSRVYR']
# del combData['RIDAGEMN']
# del combData['RIDSTATR']
# del combData['RIDEXMON']
# del combData['RIDEXAGM']
# print(combData)

# combined_data = pd.concat([demoData, dietData, examData, labData, medData, questData], axis=1)

# # Save the combined DataFrame to a CSV file
# combined_data.to_csv('combined_data.csv', index=False)