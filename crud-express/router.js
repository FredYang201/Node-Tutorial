const fs = require('fs')
const express = require('express')
const Student = require('./students')


// 创建路由器
const router = express.Router()

router.get('/students', (req, res) => {
    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Server error.')
        }
        // res.render('index.html', {
        //     students: JSON.parse(data).students
        // })
        Student.find(function(err, students) {
            if (err) {
                return res.status(500).send('Server error.')
            }
            res.render('index.html', {
                fruits: [
                    'apple', 'banana', 'orange', 'peach'
                ],
                students: students
            })
        })
    })
})

// 增加学生
router.get('/students/new', (req, res) => {
    res.render('post.html')
})

router.post('/students/new', (req, res) => {
    Student.save(req.body, (err) => {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })

})

// 编辑学生
router.get('/students/edit', (req, res) => {
    Student.findById(parseInt(req.query.id), (err, student) => {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('edit.html', {
            student: student
        })
    })
})

router.post('/students/edit', (req, res) => {
    Student.updateById(req.body, (err) => {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete', (req, res) => {
    Student.deleteById(parseInt(req.query.id), (err) => {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})


module.exports = router