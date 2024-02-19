import { FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Snackbar from 'react-native-snackbar'
import Icons from './Components/Icons'

export default function App() : JSX.Element {
  const [isCross, setIsCross] = useState<Boolean>(false)
  const [gameWinner, setgameWinner] = useState('')
  const [gameState, setgameState] = useState(new Array(9).fill('empty',0,9))

  const reloadGame = () => {
    setIsCross(false);
    setgameWinner('');
    setgameState(new Array(9).fill('empty',0,9));
  }

  const checkWinner = () => {

    if (gameState[0] === gameState[1] && gameState[0] === gameState[2] && gameState[0] != 'empty')
    {
      setgameWinner(`${gameState[0]} won the game! 🥳`)
    }
    else if (gameState[3] === gameState[4] && gameState[3] === gameState[5] && gameState[3] != 'empty')
    {
      setgameWinner(`${gameState[3]} won the game! 🥳`)
    }
    else if (gameState[6] === gameState[7] && gameState[6] === gameState[8] && gameState[6] != 'empty')
    {
      setgameWinner(`${gameState[6]} won the game! 🥳`)
    }
    else if (gameState[0] === gameState[3] && gameState[0] === gameState[6] && gameState[0] != 'empty')
    {
      setgameWinner(`${gameState[0]} won the game! 🥳`)
    }
    else if (gameState[1] === gameState[4] && gameState[1] === gameState[7] && gameState[1] != 'empty')
    {
      setgameWinner(`${gameState[1]} won the game! 🥳`)
    }
    else if (gameState[2] === gameState[5] && gameState[2] === gameState[8] && gameState[2] != 'empty')
    {
      setgameWinner(`${gameState[2]} won the game! 🥳`)
    }
    else if (gameState[0] === gameState[4] && gameState[0] === gameState[8] && gameState[2] != 'empty')
    {
      setgameWinner(`${gameState[0]} won the game! 🥳`)
    }
    else if (gameState[2] === gameState[4] && gameState[2] === gameState[6] && gameState[2] != 'empty')
    {
      setgameWinner(`${gameState[2]} won the game! 🥳`)
    }
    else if (!gameState.includes('empty',0)){
      setgameWinner("Draw game... ⌛️")
    }

  }

  const onchangeItem = (position: number) => {
    if(gameWinner)
    {
      return Snackbar.show({
        text : gameWinner,
        textColor : '#45CE30',
        backgroundColor : "#000000"
      })
    }
    
     if (gameState[position] === 'empty')
    {
      gameState[position] = isCross ? 'cross' : 'circle'
      setIsCross(!isCross)
    }
    else
    {
      return Snackbar.show({
        text : 'Position is already filled',
        textColor : '#45CE30',
        backgroundColor : "#000000"
      })
    }
    checkWinner();
  }

  return (
   <SafeAreaView>
    <StatusBar />

    {gameWinner ? (
      <View style={[styles.playerInfo , styles.winnerInfo]}>
        <Text>{gameWinner}</Text>
      </View>
    ) : (
      <View style={[styles.playerInfo, isCross ? styles.playerX : styles.playerO]}>
        <Text style={styles.gameTurnTxt}>Player {isCross ? 'X' : 'O'} 's turn</Text>
      </View>
    )}

    <FlatList 
      numColumns={3}
      data={gameState}
      style={styles.grid}
      renderItem={({item , index}) => (
        <Pressable
        key = {index}
        style={styles.card}
        onPress={() => onchangeItem(index)}>

          <Icons name={item} />

        </Pressable>
      )}
      />
    <Pressable
    style={styles.gameBtn}
    onPress={() => reloadGame()}>
      <Text style={styles.gameBtnText}>
        {gameWinner ? 'Start New Game' : 'Reload the game'}
      </Text>
    </Pressable>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    }
  },
    winnerInfo: 
    {
      borderRadius: 8,
      backgroundColor: '#38CC77',
  
      shadowOpacity: 0.1,
    },
    playerX: {
      backgroundColor: '#38CC77',
    },
    playerO: {
      backgroundColor: '#F7CD2E',
    },
    gameTurnTxt: {
      fontSize: 20,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    grid: {
      margin: 12,
    },
    card: {
      height: 100,
      width: '33.33%',
  
      alignItems: 'center',
      justifyContent: 'center',
  
      borderWidth: 1,
      borderColor: '#333',
    },
    gameBtn: {
      alignItems: 'center',
  
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 36,
      backgroundColor: '#8D3DAF',
    },
    gameBtnText: {
      fontSize: 18,
      color: '#FFFFFF',
      fontWeight: '500',
    },
})